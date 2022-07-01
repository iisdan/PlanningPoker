import moment from "moment";
import { realtimeDatabase } from "../realtimeDatabase";
import { Game, Player, Ticket } from '../interfaces';
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

async function pushGame(code: string, game: Game) {
  await realtimeDatabase.set('games', code, game);
}

export function useGame(roomCode?: string, myInformation?: Player, role?: 'player' | 'host') {
  const gameStore = useGameStore();
  console.log('roomCode',roomCode)

  useEffect(() => {
    console.log('effect',roomCode)

    if (roomCode && (myInformation || role === 'host')) {
      console.log('joining game')
      joinGame(roomCode, myInformation);
    }
  }, [roomCode, myInformation]); // eslint-disable-line react-hooks/exhaustive-deps
  
  async function updateGame(game: Game) {
    gameStore.setGame(game);
    await pushGame(game.code, game);
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

    let updatedTickets = [...game.tickets || [] ]
    updatedTickets.splice(0, 1)
    game.tickets = updatedTickets

    console.log('reset',game.tickets)

    updateGame(game);
    analytics.logEvent('round_started', { gameCode: gameStore.game?.code })
  }

  async function createGame(code: string, companyName: string, options: { tickets: Ticket[], disabledCards?: { [cardId: string]: boolean; } }) {

    if (!companyName) {
      alert('No comapny name set')
      return;
    }

    const currentDate = moment().toISOString();

    analytics.logEvent('game_created', { code, companyName })

    await updateGame({
      code,
      date: currentDate,
      players: {},
      phase: 'pre-game',
      disabledCards: options.disabledCards || {},
      tickets: options.tickets || [],
    })
    
  } 

  function joinGame(code: string, myInformation?: Player) {
    gameStore.setLoading(true);
    if (!code) {
      alert('No game code set')
      return;
    }
    code = code.toUpperCase();

    let hasJoinedGame = false;
    watchGame(code, (game: Game) => {

      if (!game) {
        gameStore.setLoading(false);
        return;
      }

      if (!hasJoinedGame && role === 'player' && myInformation) {
        game.players[myInformation.id] = myInformation;
        updateGame(game);
      }

      gameStore.setGame(game);
      if (myInformation) {
        analytics.logEvent('game_joined', { gameCode: code, name: myInformation.name, role: myInformation.role })
      }
      hasJoinedGame = true;
      gameStore.setLoading(false);

    });

    // Leave the game
    window.onbeforeunload = (e) => {
      // onbeforeunload scope is very limited, we have to re-get the game
      watchGame(code, (game: Game) => {
        if (myInformation) {
          delete game.players[myInformation.id];
        }
        pushGame(game.code, game)
      });
    }
  }

  function selectCard(playerId: string, card: null | number) {
    let updatedGame = { ...gameStore.game! };
    updatedGame.players[playerId].selectedCard = card;
    updateGame(updatedGame);
  }

  function addTicket() {
    let updatedGame = { ...gameStore.game! };

    updatedGame.tickets = [
      ...updatedGame.tickets || [],
      {
        number: '',
        description: '',
      }
    ]

    console.log('updatedGame.tickets',updatedGame.tickets)

    updateGame(updatedGame);
  }

  function removeTicket(index: number) {
    let updatedGame = { ...gameStore.game! };

    let updatedTickets = [...updatedGame.tickets || [] ]
    updatedTickets.splice(index, 1)
    updatedGame.tickets = updatedTickets

    console.log('removeTicket',updatedTickets)

    updateGame(updatedGame);
  }

  function updateTicket(index: number, field: 'number' | 'description', value: string) {
    let updatedGame = { ...gameStore.game! };

    let updatedTickets = [...updatedGame.tickets || [] ]
    updatedTickets[index][field] = value
    updatedGame.tickets = updatedTickets

    console.log('updateTicket',updatedTickets)

    updateGame(updatedGame);
  }

  return {
    game: gameStore.game,
    loading: gameStore.loading,
    selectCard,
    updateGame,
    startGame,
    flipCards,
    reset,
    createGame,
    joinGame,
    addTicket,
    removeTicket,
    updateTicket,
  }
}
