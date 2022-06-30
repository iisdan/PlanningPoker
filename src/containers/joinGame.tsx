import React from 'react';
import { Box } from '../components/Box';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { MaxWidth } from '../components/MaxWidth';
import { Text } from '../components/Text';
import { v4 as uuid} from 'uuid';
import { useDeviceType } from '../hooks/useDeviceType';
import { analytics } from '../analytics';
import { useMe } from '../hooks/useMe';
import { config } from '../config';
import { useLocalStorage } from '../hooks/localstorage';
import { useParams } from 'react-router-dom';
import { useNavigate } from '../hooks/navigate';

export function JoinGame() {

  const { setMe } = useMe();
  const deviceType = useDeviceType();
  const navigate = useNavigate();
  const { roomId } = useParams();

  const [roomCode, setRoomCode] = React.useState(roomId ? roomId : '');

  const [name, setName] = useLocalStorage('name', '');
  const [companyRole, setCompanyRole] = useLocalStorage('role', config.newUserDefaults.role);
  const [profileImage, setProfileImage] = useLocalStorage('profileImage', config.newUserDefaults.profileImage);

  React.useEffect(() => {
    analytics.logEvent('game_join_started', {  })
  }, [])

  const canStart = name && roomCode && companyRole && profileImage;

  return (
    <Box direction="vertical">

      <MaxWidth small>
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
            
            {/* <Box paddingRight="s">
              <Button onClick={() => navigate(-1)}>Back</Button>
            </Box> */}

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
                setMe(myInformation);
                navigate(`/play/${roomCode}`)
              }}
            >
              Join
            </Button>
            
          </Box>

        </>
      </MaxWidth>
    </Box>
  );
}