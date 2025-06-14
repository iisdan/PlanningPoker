import React from 'react';
import { Box } from '../components/Box';
import { Footer as Foot } from '../components/Footer';
import { Link } from '../components/Link';
import { MaxWidth } from '../components/MaxWidth';
import { Text } from '../components/Text';
import { useDeviceType } from '../hooks/useDeviceType';
import { useClipboard } from "../hooks/clipboard";

export function Footer(props: { roomCode: string }) {
  const device = useDeviceType();
  const url = window.location.protocol + "//" + window.location.host + `/join/${props.roomCode}`;
  const [roomCodeIsCopied, copyRoomCode] = useClipboard(url);

  return (
    <Foot>
      <MaxWidth full>
        <Box 
          direction={device === 'mobile' ? 'vertical' : 'horizontal'} 
          justifyContent="space-between" 
          alignItems="flex-end" 
        >

            {device !== 'mobile' && (
              <Box 
                width={'200px'} 
              >
                <Text size="xs" color="secondary">
                  Please play responsibly            
                </Text>
              </Box>
            )}

          <Box paddingBottom={device === 'mobile' ? 'xs' : undefined}>

            <Box paddingRight={'s'}>
              <Text size="xs" color="secondary" align={device === 'mobile' ? 'center' : undefined}>
                Cards by <Link newTab to="https://github.com/redbooth/scrum-poker-cards">Redbooth</Link>
              </Text>
            </Box>

            <Box paddingRight={'s'}>
              <Text size="xs" color="secondary" align={device === 'mobile' ? 'center' : undefined}>
                Icons by <Link newTab to="https://github.com/redbooth/scrum-poker-cards">FontAwesome</Link>
              </Text>
            </Box>

            <Text size="xs" color="secondary" align={device === 'mobile' ? 'center' : undefined}>
              Website by <Link newTab to="https://danielherbert.ca">Dan Herbert</Link> and <Link newTab to="https://linkedin.com/in/keatonneville">Keaton Neville</Link>
            </Text>

          </Box>

          {device !== 'mobile' && (
            <Box 
              width={'200px'} 
              alignItems={'flex-end'} 
              direction={'vertical'}
            >

              {!roomCodeIsCopied && (
                <Text size="xs" color="secondary" align="center" fontWeight={300}>
                  Room Code
                </Text>
              )}
              {roomCodeIsCopied && (
                <Text size="xs" fontWeight={600} color="accent" align="center">
                  Copied!
                </Text>
              )}

              <Box alignItems="flex-end">
                <Text size='s' fontWeight={500} align="right">
                  <div 
                    onClick={() => { 
                      if (props.roomCode) {
                        copyRoomCode(); 
                      }
                    }} 
                    style={{ cursor: 'pointer' }}
                  >
                    {props.roomCode || '...'}
                  </div>
                </Text>
              </Box>

            </Box>
          )}

        </Box>
      </MaxWidth>
    </Foot>
  );
}