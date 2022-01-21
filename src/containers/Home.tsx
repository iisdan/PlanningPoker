import React from 'react';
import { Box } from '../components/Box';
import { Button } from '../components/Button';
import { MaxWidth } from '../components/MaxWidth';
import { Text } from '../components/Text';
import { Card } from '../components/Card';
import React3DRotationBox from '../components/3DBox';

export function Home() {

  const [firstCardFlipped, setFirstCardFlipped] = React.useState(false);
  const [secondCardFlipped, setSecondCardFlipped] = React.useState(false);
  const [thirdCardFlipped, setThirdCardFlipped] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => setFirstCardFlipped(true), 500);
    setTimeout(() => setSecondCardFlipped(true), 650);
    setTimeout(() => setThirdCardFlipped(true), 800);
  }, [])

  return (
    <Box direction="vertical">

      <MaxWidth small>
        <>

            <Box paddingBottom="l" direction="horizontal" justifyContent="center">
              <Box padding="s">
                <React3DRotationBox className="card1">
                  <Card size='xl' card={3} flipped={firstCardFlipped} />
                </React3DRotationBox>
                  <div style={{ zIndex: 99, position:'relative', transform: 'scale(1.2)', }}>
                    <React3DRotationBox className="card2">
                      <Card size='xl' shadow card={5} flipped={secondCardFlipped} noBorder={true} />
                    </React3DRotationBox>

                  </div>
                <React3DRotationBox className="card3">
                  <Card size='xl' card={13} flipped={thirdCardFlipped} />
                </React3DRotationBox>
              </Box>
            </Box>
            
            <Box direction="vertical" justifyContent="center" alignItems="center">
              <Text size="xl" fontWeight={600} align="center">Planning in the After Times</Text>
              <Box paddingTop="s">
                <Text size="s" color="secondary" align="center">
                  A fast and easy way to score tasks in the post-apocalyptic world. 
                </Text>
              </Box>
            </Box>

            <Box direction="horizontal" paddingTop="m" alignItems="center" justifyContent="center">
              <Box paddingRight="s">
                <Button to="/new">Create Game</Button>
              </Box>
              <Box >
                <Button to='/join'>Join Game</Button>
              </Box>
            </Box>
          
        </>
      </MaxWidth>
    </Box>
  );
}