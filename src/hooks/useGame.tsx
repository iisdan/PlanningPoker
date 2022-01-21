import moment from "moment";
import { realtimeDatabase } from "../realtimeDatabase";
import { Game, Player } from '../interfaces';
import { useGameStore } from '../stores/gameStore';
import { analytics } from '../analytics';
import { useEffect } from "react";

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

export function useGame(roomCode?: string, myInformation?: Player, role?: 'player' | 'host') {
  let loading = true;
  const gameStore = useGameStore();

  useEffect(() => {
    if (roomCode && myInformation) {
      joinGame(roomCode, myInformation);
    }
  }, [roomCode, myInformation]); // eslint-disable-line react-hooks/exhaustive-deps
  
  function updateGame(game: Game) {
    gameStore.setGame(game);
    pushGame(game.code, game);
  }

  function startGame() {
    let updatedGame = { ...gameStore.game! };
    updatedGame.phase = 'selecting';

    updateGame(updatedGame);

    analytics.logEvent('game_started', { gameCode: gameStore.game?.code })
    analytics.logEvent('round_started', { gameCode: gameStore.game?.code })
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
    analytics.logEvent('round_started', { gameCode: gameStore.game?.code })
  }

  function createGame(code: string, companyName: string, options: { disabledCards: { [cardId: string]: boolean; } }) {

    if (!companyName) {
      alert('No comapny name set')
      return;
    }

    const currentDate = moment().toISOString();

    analytics.logEvent('game_created', { code, companyName })

    updateGame({
      code,
      date: currentDate,
      players: {},
      phase: 'pre-game',
      disabledCards: options.disabledCards,
    })
    
  } 

  function joinGame(code: string, myInformation: Player) {
    loading = true;
    if (!code) {
      alert('No game code set')
      return;
    }
    code = code.toUpperCase();

    let hasJoinedGame = false;
    watchGame(code, (game: Game) => {

      if (!game) {
        return;
      }

      if (!hasJoinedGame && role === 'player') {
        game.players[myInformation.id] = myInformation;
        updateGame(game);
      }

      gameStore.setGame(game);
      analytics.logEvent('game_joined', { gameCode: code, name: myInformation.name, role: myInformation.role })
      hasJoinedGame = true;
      loading = false;

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
    loading,
  }
}
