import React from 'react';
import { Box } from '../components/Box';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { MaxWidth } from '../components/MaxWidth';
import { Text } from '../components/Text';
import { Player } from '../interfaces';
import { useSession } from '../state/session';
import { v4 as uuid} from 'uuid';
import { getLocal } from '../utils/localstorage';
import { Card } from '../components/Card';
import { useDeviceType } from '../hooks/useDeviceType';

export function Home(props: { session: ReturnType<typeof useSession>; }) {

  const [currentState, setCurrentState] = React.useState<'join' | 'create' | 'deciding'>('deciding');
  const [companyName, setCompanyName] = React.useState('');
  const [name, setName] = React.useState('');
  const [roomCode, setRoomCode] = React.useState('');
  const [role, setRole] = React.useState('Developer');
  const [profileImage, setProfileImage] = React.useState('https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/2-space-cat-riding-unicorn-laser-tacos-and-rainbow-random-galaxy.jpg');
  const deviceType = useDeviceType();

  React.useEffect(() => {
    const previousUserData = getLocal<Player>('userData');
    if (previousUserData) {
      setName(previousUserData.name)
      setRole(previousUserData.role)
      setProfileImage(previousUserData.profileImage)
    }
  }, []);

  React.useEffect(() => {
    const hostData = getLocal<{ companyName: string; }>('hostData');
    if (hostData) {
      setCompanyName(hostData.companyName)
    }
  }, []);

  const canStart = name && roomCode && role && profileImage;

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
                  <Card card={3} flipped={firstCardFlipped} />
                  <div style={{ zIndex: 99, position:'relative', transform: 'scale(1.2)', }}>
                    <Card shadow card={5} flipped={secondCardFlipped} noBorder={true} />
                  </div>
                  <Card card={13} flipped={thirdCardFlipped} />
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
                {/* <Box paddingTop="s">
                  <Text size="s" color="secondary" align="center">Enter the room code below to join the game.</Text>
                </Box> */}
              </Box>

              <Box paddingLeft="s" paddingRight="s" paddingTop="m" justifyContent="center" direction="vertical">
                <Input autofocus label="Company name" value={companyName} setValue={(companyName) => setCompanyName(companyName)} />
              </Box>

              <Box direction="horizontal" paddingTop={deviceType === 'mobile' ? 'xs' : 'm'} alignItems="center" justifyContent="center">
                
                <Box paddingRight="s">
                  <Button onClick={() => setCurrentState('deciding')}>Back</Button>
                </Box>

                <Button 
                  disabled={!companyName}
                  onClick={() => {
                    props.session.createGame(companyName);
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
                <Input label="Role" value={role} setValue={(role) => setRole(role)} />
                <Input label="Profile Picture URL" value={profileImage} setValue={(profileImage) => setProfileImage(profileImage)} />
              </Box>

              <Box direction="horizontal" paddingTop={deviceType === 'mobile' ? 'xs' : 'm'} alignItems="center" justifyContent="center">
                
                <Box paddingRight="s">
                  <Button onClick={() => setCurrentState('deciding')}>Back</Button>
                </Box>

                <Button 
                  disabled={!canStart}
                  onClick={() => {
                    props.session.joinGame(roomCode, { 
                    id: uuid(),
                    name,
                    role,
                    profileImage,
                    selectedCard: null
                  }
                  )}}
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