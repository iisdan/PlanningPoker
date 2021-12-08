import React from 'react';
import { Box } from '../components/Box';
import { Footer as Foot } from '../components/Footer';
import { Link } from '../components/Link';
import { MaxWidth } from '../components/MaxWidth';
import { Text } from '../components/Text';
import { useDeviceType } from '../hooks/useDeviceType';
import { copyToClipboard } from '../utils/system';

export function Footer(props: { roomCode: string }) {
  const [copied, setCopied] = React.useState(false);
  const device = useDeviceType();

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
                  {/* <Link to="https://buymeacoffee.com/dannnnn" newTab>🍺</Link> */}
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
              Website by <Link newTab to="https://danielherbert.ca">Dan Herbert</Link>
            </Text>

          </Box>

          {device !== 'mobile' && (
            <Box 
              width={'200px'} 
              alignItems={'flex-end'} 
              direction={'vertical'}
            >

              {!copied && (
                <Text size="xs" color="secondary" align="center" fontWeight={300}>
                  Room Code
                </Text>
              )}
              {copied && (
                <Text size="xs" fontWeight={600} color="accent" align="center">
                  Copied!
                </Text>
              )}

              <Box alignItems="flex-end">
                <Text size='s' fontWeight={500} align="right">
                  <div 
                    onClick={() => { 
                      if (props.roomCode) {
                        copyToClipboard(props.roomCode); setCopied(true); 
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