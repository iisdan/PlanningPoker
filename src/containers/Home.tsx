import React from 'react';
import { Box } from '../components/Box';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { MaxWidth } from '../components/MaxWidth';
import { Text } from '../components/Text';
import { TextToggle } from '../components/TextToggle';
import { useGame } from '../hooks/useGame';
import { v4 as uuid} from 'uuid';
import { Card } from '../components/Card';
import { useDeviceType } from '../hooks/useDeviceType';
import { analytics } from '../analytics';
import { useMe } from '../hooks/useMe';
import { config } from '../config';
import { useLocalStorage } from '../hooks/localstorage';
import { DisabledCards } from './DisabledCards';

export function Home() {

  const { createGame, joinGame } = useGame();
  const { setRole, setMe } = useMe();
  const deviceType = useDeviceType();

  const [currentState, setCurrentState] = React.useState<'join' | 'create' | 'deciding'>('deciding');

  const [disabledCards, setDisabledCards] = React.useState<{ [card: string]: boolean; }>({});
  const [disabledCardsLocalStorage, setDisabledCardsLocalStorage] = useLocalStorage('disabledCards', '{}');

  // Update local storage with disabled cards
  React.useEffect(() => {
    if (JSON.stringify(disabledCards) !== disabledCardsLocalStorage) {
      setDisabledCardsLocalStorage(JSON.stringify(disabledCards));
    }
  }, [disabledCards]); // eslint-disable-line react-hooks/exhaustive-deps

  // Get disabled cards from local storage on load 
  React.useEffect(() => {
    setDisabledCards(JSON.parse(disabledCardsLocalStorage) || {});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [roomCode, setRoomCode] = React.useState('');
  const [showingAdvanced, setShowingAdvanced] = React.useState(false);

  const [companyName, setCompanyName] = useLocalStorage('companyName', '');
  const [name, setName] = useLocalStorage('name', '');
  const [companyRole, setCompanyRole] = useLocalStorage('role', config.newUserDefaults.role);
  const [profileImage, setProfileImage] = useLocalStorage('profileImage', config.newUserDefaults.profileImage);

  React.useEffect(() => {
    if (currentState === 'join') {
      analytics.logEvent('game_join_started', {  })
    }
    if (currentState === 'create') {
      analytics.logEvent('game_create_started', {  })
    }
  }, [currentState])

  const canStart = name && roomCode && companyRole && profileImage;

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
          {currentState === 'deciding' && (
            <>

              <Box paddingBottom="l" direction="horizontal" justifyContent="center">
                <Box padding="s">
                  <Card size='xl' card={3} flipped={firstCardFlipped} />
                  <div style={{ zIndex: 99, position:'relative', transform: 'scale(1.2)', }}>
                    <Card size='xl' shadow card={5} flipped={secondCardFlipped} noBorder={true} />
                  </div>
                  <Card size='xl' card={13} flipped={thirdCardFlipped} />
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
                  <Button onClick={() => setCurrentState('create')}>Create Game</Button>
                </Box>
                <Box >
                  <Button onClick={() => setCurrentState('join')}>Join Game</Button>
                </Box>
              </Box>

            </>
          )}

          {currentState === 'create' && (
            <>
              <Box direction="vertical" alignItems="center">
                <Text size="xl" fontWeight={600}>Create Game</Text>
              </Box>

              <Box paddingLeft="s" paddingRight="s" paddingTop="m" justifyContent="center" direction="vertical">
                <Input autofocus label="Company name" value={companyName} setValue={(companyName) => setCompanyName(companyName)} />
              </Box>

              {showingAdvanced && (
                <DisabledCards disabledCards={disabledCards} setDisabledCards={setDisabledCards} />
              )}

              <Box justifyContent='center'>
                <TextToggle on={showingAdvanced} onChange={setShowingAdvanced} offText="Show Advanced" onText="Hide Advanced" />
              </Box>

              <Box direction="horizontal" paddingTop={deviceType === 'mobile' ? 'xs' : 'm'} alignItems="center" justifyContent="center">
                
                <Box paddingRight="s">
                  <Button onClick={() => setCurrentState('deciding')}>Back</Button>
                </Box>

                <Button 
                  disabled={!companyName}
                  onClick={() => {
                    createGame(companyName, { disabledCards });
                    setRole('host');
                  }}
                >
                  Create
                </Button>
                
              </Box>

            </>
          )}

          {currentState === 'join' && (
            <>
              <Box direction="vertical" alignItems="center">
                <Text size="xl" fontWeight={600}>Join Game</Text>
                <Box paddingTop="s">
                  <Text size="s" color="secondary" align="center">Enter the room code below to join the game.</Text>
                </Box>
              </Box>

              <Box paddingLeft="s" paddingRight="s" paddingTop="m" justifyContent="center" direction="vertical">
                <Input autofocus label="Room Code" value={roomCode} setValue={(roomCode) => setRoomCode(roomCode)} />
                <Input label="Name" value={name} setValue={(name) => setName(name)} />
                <Input label="Role" value={companyRole} setValue={(companyRole) => setCompanyRole(companyRole)} />
                <Input label="Profile Picture URL" value={profileImage} setValue={(profileImage) => setProfileImage(profileImage)} />
              </Box>

              <Box direction="horizontal" paddingTop={deviceType === 'mobile' ? 'xs' : 'm'} alignItems="center" justifyContent="center">
                
                <Box paddingRight="s">
                  <Button onClick={() => setCurrentState('deciding')}>Back</Button>
                </Box>

                <Button 
                  disabled={!canStart}
                  onClick={() => {
                    const myInformation = { 
                      id: uuid(),
                      name,
                      role: companyRole,
                      profileImage,
                      selectedCard: null
                    };
                    joinGame(roomCode, myInformation);
                    setRole('player');
                    setMe(myInformation);
                  }}
                >
                  Join
                </Button>
                
              </Box>

            </>
          )}
        </>
      </MaxWidth>
    </Box>
  );
}