import moment from "moment";
import { saveLocal } from "../utils/localstorage";
import { realtimeDatabase } from "../realtimeDatabase";
import { generateUUID } from "../utils/data";
import { Game, Player } from '../interfaces';
import { useGameStore } from '../stores/gameStore';

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

export function useGame() {
  const gameStore = useGameStore();
  
  function updateGame(game: Game) {
    gameStore.setGame(game);
    pushGame(game.code, game);
  }

  function startGame() {
    let updatedGame = { ...gameStore.game! };
    updatedGame.phase = 'selecting';

    updateGame(updatedGame);

    realtimeDatabase.logEvent('game_started', { gameCode: gameStore.game?.code })
    realtimeDatabase.logEvent('round_started', { gameCode: gameStore.game?.code })
  }

  function flipCards() {
    let updatedGame = { ...gameStore.game! };
    updatedGame.phase = 'reviewing';

    updateGame(updatedGame);
  }

  function reset() {
    let game = { ...gameStore.game! };
    game.phase = 'selecting';

    const playerIds = Object.keys(game.players);
    playerIds.forEach((playerId) => {
      game.players[playerId].selectedCard = null;
    });

    updateGame(game);
    realtimeDatabase.logEvent('round_started', { gameCode: gameStore.game?.code })
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
    

    watchGame(code, (game: Game) => {
      if (game) {
        gameStore.setGame(game);
      }
    })

    window.onbeforeunload = (e) => {
      realtimeDatabase.delete('games', code);
    }
  } 

  function joinGame(code: string, myInformation: Player) {

    if (!code) {
      alert('No game code set')
      return;
    }
    code = code.toUpperCase();

    let hasJoinedGame = false;
    watchGame(code, (game: Game) => {

      if (!game && hasJoinedGame) {
        alert('The host has left the game');
        window.location.reload();
        return;
      }

      if (!game && !hasJoinedGame) {
        alert("Can't find game");
        return;
      }

      if (!hasJoinedGame) {
        game.players[myInformation.id] = myInformation;
        updateGame(game);
      }

      gameStore.setGame(game);
      realtimeDatabase.logEvent('game_joined', { gameCode: code, name: myInformation.name, role: myInformation.role })
      hasJoinedGame = true;

    });

    // Leave the game
    window.onbeforeunload = (e) => {
      // onbeforeunload scope is very limited, we have to re-get the game
      watchGame(code, (game: Game) => {
        delete game.players[myInformation.id];
        pushGame(game.code, game)
      });
    }
  }

  function selectCard(playerId: string, card: null | number) {
    let updatedGame = { ...gameStore.game! };
    updatedGame.players[playerId].selectedCard = card;
    updateGame(updatedGame);
  }

  return {
    game: gameStore.game,
    selectCard,
    updateGame,
    startGame,
    flipCards,
    reset,
    createGame,
    joinGame,
  }
}
