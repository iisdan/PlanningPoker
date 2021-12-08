import { useState } from "react"
import moment from "moment";
import { saveLocal } from "../utils/localstorage";
import { realtimeDatabase } from "../realtimeDatabase";
import { generateUUID } from "../utils/data";
import { Game, Player } from '../interfaces'

function watchGame(code: string, callback: (game: Game) => void) {
  realtimeDatabase.watch('games', code, (game: Game) => {
    if (game) {
      game.players = game.players || {};
    }
    callback(game);
  })
}

function pushGame(code: string, game: Game) {
  realtimeDatabase.set('games', code, game);
}

export function useSession() {
    const [game, setGame] = useState<Game | null>(null);
    const [type, setType] = useState<'player' | 'host' | null>(null);
    const [myId, setMyId] = useState<string | null>(null);
    
    const updateGame = (game: Game) => {
      setGame(game);
      pushGame(game.code, game);
    }

    const startGame = (companyName: string) => {
      let updatedGame = { ...game! };
      updatedGame.phase = 'selecting';
      updateGame(updatedGame);
      realtimeDatabase.logEvent('game_started', { gameCode: game?.code, companyName })
      realtimeDatabase.logEvent('round_started', { gameCode: game?.code })
      saveLocal('hostData', { companyName })
    }

    const flipCards = () => {
      let updatedGame = { ...game! };
      updatedGame.phase = 'reviewing';
      updateGame(updatedGame);
    }
  
    const reset = () => {
      let updatedGame = { ...game! };
      updatedGame.phase = 'selecting';

      const playerIds = Object.keys(game!.players);
  
      playerIds.forEach((playerId) => {
        updatedGame.players[playerId].selectedCard = null;
      });
  
      updateGame(updatedGame);

      realtimeDatabase.logEvent('round_started', { gameCode: game?.code })
    }

    function createGame() {
      const currentDate = moment().toISOString();
      const code = generateUUID({ uppercase: true, length: 5 });

      realtimeDatabase.logEvent('game_created', { code })

      updateGame({
        code,
        date: currentDate,
        players: {},
        phase: 'pre-game',
      })
      setType('host');

      watchGame(code, (game: Game) => {
        if (game) {
          setGame(game);
        }
      })

      window.onbeforeunload = (e) => {
        realtimeDatabase.delete('games', code);
      }
    } 

    function joinGame(code: string, me: Player) {
      let hasAddedMe = false;
      code = code.toUpperCase();
      const myId = me.id;
      realtimeDatabase.logEvent('game_joined', { gameCode: code, name: me.name, role: me.role })

      watchGame(code, (game: Game) => {
        if (game) {

          if (!hasAddedMe) {
            game.players[me.id] = me;
            hasAddedMe = true;
            updateGame(game)
          }

          setMyId(me.id);
          setType('player')
          setGame(game);
          saveLocal('userData', me);

        } else {
          if (hasAddedMe) {
            alert('The host has left the game')
            window.location.reload();
          } else {
            alert("Can't find game")
          }
        }
      });

      // Leave the game
      window.onbeforeunload = (e) => {
        // onbeforeunload scope is very limited, we have to re-get the game
        watchGame(code, (game: Game) => {
          delete game.players[myId!];
          pushGame(game.code, game)
        });
      }
    }

    function setSelectedCard(playerId: string, card: null | number) {
      let updatedGame = { ...game! };
      updatedGame.players[playerId].selectedCard = card;
      updateGame(updatedGame);
    }

    return {
      game,
      setSelectedCard,
      updateGame,
      startGame,
      flipCards,
      reset,
      myId,
      type,
      setType,
      createGame,
      joinGame,
    }
}
