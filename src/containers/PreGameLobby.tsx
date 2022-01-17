import React from 'react';
import { Box } from '../components/Box';
import { Button } from '../components/Button';
import { ProfileImageLarge } from '../components/ProfileImageLarge';
import { Text } from '../components/Text';
import { useGame } from '../hooks/useGame';
import { useMe } from '../hooks/useMe';
import { useClipboard } from '../hooks/clipboard';

export function PreGameLobby() {

  const { game, startGame } = useGame();
  const { role } = useMe();

  const players = game?.players || {};
  const phase = game?.phase;

  const hasPlayers = Boolean(Object.values(players).length);
  const url = window.location.href;
  const [roomCodeIsCopied, copyRoomCode] = useClipboard(`${url}${'join/'}${game?.code!}`);

  return (
    <Box wrap alignItems="center" justifyContent="center" direction="vertical">
      <Box direction="horizontal" justifyContent="center" alignItems="center" wrap>

        <Box direction="vertical" alignItems="center" justifyContent="center" wrap>
          {!hasPlayers && (
            <Box direction="vertical" alignItems="center" justifyContent="center">
              <Text fontWeight={600} size="xxl">No players yet</Text>
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

          {role === 'host' && (
            <>
              <Box paddingTop="s">
                {!roomCodeIsCopied && (
                  <Text size="xs" color="secondary" align="center">
                    Room Code
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

          {role === 'player' && (
            <Box paddingTop="m">
              <Text size="m" color="secondary" align="center">
                Waiting for the host
              </Text>
            </Box>
          )}

        </Box>

      </Box>

      {role === 'host' && (
        <Box paddingTop="m" direction="vertical">

          {phase === 'pre-game' && (
            <Button onClick={startGame} disabled={!hasPlayers}>Start Round</Button>
          )}

        </Box>
      )}

    </Box>
  );
}