import React from 'react';
import { Box } from '../components/Box';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ProfileImage } from '../components/ProfileImage';
import { useSession } from '../state/session';

export function GameView(props: { role: 'host' | 'player'; session: ReturnType<typeof useSession>; }) {

  const session = props.session;
  const game = session.game;
  const players = game?.players || {};
  const phase = game?.phase;
  const myId = session.myId;
  const me = game?.players[myId || ''];

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

      {props.role === 'host' && (
        <Box paddingTop="l" justifyContent="center">

          {phase === 'selecting' && (
            <Button onClick={() => session.flipCards()} disabled={numberOfCardsSelected === 0}>Flip</Button>
          )}

          {phase === 'reviewing' && (
            <Button onClick={() => session.reset()}>Next Round</Button>
          )}

        </Box>
      )}

      {props.role === 'player' && (
        <Box paddingTop="l" justifyContent="center">

          <Button disabled={phase !== 'selecting'} onClick={() => session.setSelectedCard(myId!, null)}>Change Card</Button>

        </Box>
      )}

    </Box>
  );
}