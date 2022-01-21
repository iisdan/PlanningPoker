import React from 'react';
import { Box } from '../components/Box';
import { Button } from '../components/Button';
import { ProfileImageLarge } from '../components/ProfileImageLarge';
import { Text } from '../components/Text';
import { useGame } from '../hooks/useGame';
import { useClipboard } from '../hooks/clipboard';

export function PreGameLobby(props: { role: 'player' | 'host', showStartButton: boolean }) {

  const { game, startGame } = useGame();

  const players = game?.players || {};

  const hasPlayers = Boolean(Object.values(players).length);
  const url = window.location.protocol + "//" + window.location.host + `/join/${game?.code}`;
  const [roomCodeIsCopied, copyRoomCode] = useClipboard(url);

  return (
    <Box wrap alignItems="center" justifyContent="center" direction="vertical">
      <Box direction="horizontal" justifyContent="center" alignItems="center" wrap>

        <Box direction="vertical" alignItems="center" justifyContent="center" wrap>
          {!hasPlayers && (
            <Box direction="vertical" alignItems="center" justifyContent="center">
              <Text fontWeight={600} size="xxl">No Players</Text>
            </Box>
          )}

          {hasPlayers && (
            <Box wrap alignItems="center" justifyContent="center">
              {Object.values(players).map(player => (
                <Box padding="l" >
                  <ProfileImageLarge
                    image={player.profileImage}
                    name={player.name}
                    role={player.role}
                  />
                </Box>
              ))}
            </Box>
          )}

          {props.role === 'host' && (
            <>
              <Box paddingTop="s">
                {!roomCodeIsCopied && (
                  <Text size="xs" color="secondary" align="center">
                    Room Code (Cick to copy)
                  </Text>
                )}
                {roomCodeIsCopied && (
                  <Text size="xs" fontWeight={600} color="accent" align="center">
                    Copied!
                  </Text>
                )}
              </Box>
              <Text size="xxl" fontWeight={600} color="accent">
                <div 
                  onClick={copyRoomCode} 
                  style={{ cursor: 'pointer' }}
                >
                    {game?.code}
                  </div>
              </Text>
            </>
          )}

          {props.role === 'player' && (
            <Box paddingTop="m">
              <Text size="m" color="secondary" align="center">
                Waiting for the host
              </Text>
            </Box>
          )}

        </Box>

      </Box>

      {props.role === 'host' && props.showStartButton && (
        <Box paddingTop="m" direction="vertical">

            <Button onClick={startGame} disabled={!hasPlayers}>Start Round</Button>

        </Box>
      )}

    </Box>
  );
}