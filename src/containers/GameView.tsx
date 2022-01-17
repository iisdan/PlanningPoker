import React from 'react';
import { Box } from '../components/Box';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ProfileImage } from '../components/ProfileImage';
import { useGame } from '../hooks/useGame';
import { useMe } from '../hooks/useMe';

export function GameView() {

  const { game, flipCards, reset, selectCard } = useGame();
  const { me, role } = useMe();

  const players = game?.players || {};
  const phase = game?.phase;
  const myId = me?.id!;

  const numberOfCardsSelected = React.useMemo(() => {
    const playersWithCardsSelected = Object.values(game?.players || {}).filter(player => Boolean(player.selectedCard));
    return playersWithCardsSelected.length;
  }, [game]);

  return (
    <Box direction="vertical" wrap>

      <Box direction="horizontal" justifyContent="center" alignItems="center" wrap>

        {Object.values(players).map(player => (
          <Box padding="s" direction="vertical" alignItems="center" justifyContent="center">

            <Card 
              size='xl'
              card={player.selectedCard} 
              flipped={phase === 'reviewing' || myId === player.id} 
              hidden={!Boolean(player.selectedCard)} 
            />

            <Box paddingTop="s">
              <ProfileImage 
                image={player.profileImage}
                name={player.name}
                role={player.role}
              />
            </Box>
            
          </Box>
        ))}

      </Box>

      {game && role === 'host' && (
        <Box paddingTop="l" justifyContent="center">

          {phase === 'selecting' && (
            <Button onClick={flipCards} disabled={numberOfCardsSelected === 0}>Flip</Button>
          )}

          {phase === 'reviewing' && (
            <Button onClick={reset}>Next Round</Button>
          )}

        </Box>
      )}

      {game && role === 'player' && (
        <Box paddingTop="l" justifyContent="center">

          <Button disabled={phase !== 'selecting'} onClick={() => selectCard(myId, null)}>Change Card</Button>

        </Box>
      )}

    </Box>
  );
}