import React, { useContext, useState } from "react"
import moment from "moment";
import { saveLocal } from "../utils/localstorage";
import { realtimeDatabase } from "../realtimeDatabase";
import { generateUUID } from "../utils/data";
import { Game, Player } from '../interfaces';

const SessionContext = React.createContext<ReturnType<typeof useSessionContext> | null>(null);

function useSessionContext() {
  const [game, setGame] = useState<Game | null>(null);
  const [type, setType] = useState<'player' | 'host' | null>(null);
  const [myId, setMyId] = useState<string | null>(null);

  const sessionContext = React.useMemo(() => ({ 
    game, setGame,
    type, setType,
    myId, setMyId
  }), [
    game, setGame,
    type, setType,
    myId, setMyId,
  ]);

  return sessionContext;
}

export function Provider(props: { children: React.ReactElement }) {
  const context = useSessionContext();
  return (
    <SessionContext.Provider value={context}>
      {props.children}
    </SessionContext.Provider>
  );
}

export function useSessionNew() {
  return useContext(SessionContext);
}

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
    const context = useSessionNew()!;
    
    const updateGame = (game: Game) => {
      context.setGame(game);
      pushGame(game.code, game);
    }

    const startGame = () => {
      let updatedGame = { ...context.game! };
      updatedGame.phase = 'selecting';
      updateGame(updatedGame);
      realtimeDatabase.logEvent('game_started', { gameCode: context.game?.code })
      realtimeDatabase.logEvent('round_started', { gameCode: context.game?.code })
    }

    const flipCards = () => {
      let updatedGame = { ...context.game! };
      updatedGame.phase = 'reviewing';
      updateGame(updatedGame);
    }
  
    const reset = () => {
      let updatedGame = { ...context.game! };
      updatedGame.phase = 'selecting';

      const playerIds = Object.keys(context.game!.players);
  
      playerIds.forEach((playerId) => {
        updatedGame.players[playerId].selectedCard = null;
      });
  
      updateGame(updatedGame);

      realtimeDatabase.logEvent('round_started', { gameCode: context.game?.code })
    }

    function createGame(companyName: string) {

      if (!companyName) {
        alert('No comapny name set')
        return;
      }

      const currentDate = moment().toISOString();
      const code = generateUUID({ uppercase: true, length: 5 });

      realtimeDatabase.logEvent('game_created', { code, companyName })
      saveLocal('hostData', { companyName })

      updateGame({
        code,
        date: currentDate,
        players: {},
        phase: 'pre-game',
      })
      context.setType('host');

      watchGame(code, (game: Game) => {
        if (game) {
          context.setGame(game);
        }
      })

      window.onbeforeunload = (e) => {
        realtimeDatabase.delete('games', code);
      }
    } 

    function joinGame(code: string, me: Player) {

      if (!code) {
        alert('No game code set')
        return;
      }

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

          context.setMyId(me.id);
          context.setType('player')
          context.setGame(game);
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
      let updatedGame = { ...context.game! };
      updatedGame.players[playerId].selectedCard = card;
      updateGame(updatedGame);
    }

    return {
      game: context.game,
      setSelectedCard,
      updateGame,
      startGame,
      flipCards,
      reset,
      myId: context.myId,
      type: context.type,
      setType: context.setType,
      createGame,
      joinGame,
    }
}
