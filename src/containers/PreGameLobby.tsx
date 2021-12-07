import React from 'react';
import { Box } from '../components/Box';
import { Button } from '../components/Button';
import { MaxWidth } from '../components/MaxWidth';
import { ProfileImageLarge } from '../components/ProfileImageLarge';
import { Text } from '../components/Text';
import { useSession } from '../state/session';
import { copyToClipboard } from '../utils/system';

export function PreGameLobby(props: { role: 'host' | 'player'; session: ReturnType<typeof useSession>; }) {

  const session = props.session;
  const game = session.game;
  const players = game?.players || {};
  const phase = game?.phase;

  const hasPlayers = Boolean(Object.values(players).length);

  const [copied, setCopied] = React.useState(false);

  return (
    <Box wrap alignItems="center" justifyContent="center" direction="vertical">
      <Box direction="horizontal" justifyContent="center" alignItems="center" wrap>

        <Box direction="vertical" alignItems="center" justifyContent="center" wrap>
          {!hasPlayers && (
            <>
              <Box direction="vertical" alignItems="center" justifyContent="center">
                {/* <Box paddingBottom="s" alignItems="center" justifyContent="center">
                  <img src={require('../assets/icons/sad.svg').default} style={{ width: 100 }} />
                </Box> */}
                <Text fontWeight={600} size="xxl">No players yet</Text>
              </Box>
            </>
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

          {props.session.type === 'host' && (
            <>
              <Box paddingTop="m">
                {!copied && (
                  <Text size="xs" color="secondary" align="center">
                    Room Code
                  </Text>
                )}
                {copied && (
                  <Text size="xs" fontWeight={600} color="accent" align="center">
                    Copied!
                  </Text>
                )}
              </Box>
              <Text size="xxl" fontWeight={600} color="accent">
                <div 
                  onClick={() => { copyToClipboard(game?.code!); setCopied(true); }} 
                  style={{ cursor: 'pointer' }}
                >
                    {game?.code}
                  </div>
              </Text>
            </>
          )}

          {props.session.type === 'player' && (
            <Box paddingTop="m">
              <Text size="m" color="secondary" align="center">
                Waiting for the host
              </Text>
            </Box>
          )}

        </Box>

      </Box>

      {props.role === 'host' && (
        <Box paddingTop="l">

          {phase === 'pre-game' && (
            <Button onClick={() => session.startGame()} disabled={!hasPlayers}>Start Game</Button>
          )}

        </Box>
      )}

    </Box>
  );
}