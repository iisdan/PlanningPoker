import React from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '../components/Box';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ProfileImage } from '../components/ProfileImage';
import { useGame } from '../hooks/useGame';
import { useMe } from '../hooks/useMe';
import { CardSelectView } from './CardSelectView';
import { PreGameLobby } from './PreGameLobby';
import { Text } from '../components/Text';
import { useNavigate } from '../hooks/navigate';
import { Loading } from '../components/Loading';

export function GameView(props: { role: 'player' | 'host' }) {

  const { roomId } = useParams();
  const navigate = useNavigate();

  const { me } = useMe();
  const { game, flipCards, reset, selectCard, loading } = useGame(roomId, me, props.role);

  const players = React.useMemo(() => game?.players || {}, [game?.players]); 
  const phase = game?.phase;
  const myId = me?.id!;
  const hasPlayers = Boolean(Object.keys(players).length);

  const numberOfCardsSelected = React.useMemo(() => {
    const playersWithCardsSelected = Object.values(game?.players || {}).filter(player => Boolean(player.selectedCard));
    return playersWithCardsSelected.length;
  }, [game]);
console.log('tickets',game?.tickets)
  const tickets = game?.tickets || []
  const currentTicket = tickets ? tickets[0] : null

  const cardSize = React.useMemo(() => {
    const playerCount = Object.values(players).length;
    if (playerCount > 8) {
      return 'l';
    }
    if (playerCount > 16) {
      return 'm';
    }
    return 'xl';
  }, [players]);
  
  if (!game && loading) {
    return <Loading />;
  }

  if (!game && !loading) {
    return (
      <>
        <Box paddingBottom='l'>
          <Text size='xl'>No Game Found</Text>
        </Box>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </>
    );
  }

  if (!hasPlayers || game?.phase === 'pre-game') {
    return <PreGameLobby role={props.role} showStartButton={game?.phase === 'pre-game'} />;
  }

  return (
    <Box direction="vertical" wrap>

      {props.role === 'player' && (
        <CardSelectView />
      )}

      {(currentTicket?.number || currentTicket?.description) && (
        <Box paddingBottom='l' direction='vertical'>
          {currentTicket?.number && (
            <Text size='xl' fontWeight={500} align='center'>{currentTicket?.number}</Text>
          )}

          {currentTicket?.description && (
            <Text size='s' color='secondary' align='center'>{currentTicket?.description}</Text>
          )}
        </Box>
      )}

      <Box direction="horizontal" justifyContent="center" alignItems="center" wrap>

        {Object.values(players).map(player => (
          <Box padding="s" direction="vertical" alignItems="center" justifyContent="center">

            <Card 
              size={cardSize}
              card={player.selectedCard} 
              flipped={phase === 'reviewing' || (myId === player.id && props.role === 'player')} 
              hidden={!Boolean(player.selectedCard)} 
            />

            <Box paddingTop="s">
              <ProfileImage 
                image={player.profileImage}
                name={player.name}
                role={props.role}
              />
            </Box>
            
          </Box>
        ))}

      </Box>

      {game && props.role === 'host' && (
        <Box paddingTop="l" justifyContent="center">

          {phase === 'selecting' && (
            <Button onClick={flipCards} disabled={numberOfCardsSelected === 0}>Flip</Button>
          )}

          {phase === 'reviewing' && (
            <Button onClick={reset}>Next Round</Button>
          )}

        </Box>
      )}

      {game && props.role === 'player' && (
        <Box paddingTop="l" justifyContent="center">

          <Button disabled={phase !== 'selecting'} onClick={() => selectCard(myId, null)}>Change Card</Button>

        </Box>
      )}

    </Box>
  );
}