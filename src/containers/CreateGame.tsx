import React from 'react';
import { Box } from '../components/Box';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { MaxWidth } from '../components/MaxWidth';
import { Text } from '../components/Text';
import { TextToggle } from '../components/TextToggle';
import { useGame } from '../hooks/useGame';
import { useDeviceType } from '../hooks/useDeviceType';
import { analytics } from '../analytics';
import { useLocalStorage } from '../hooks/localstorage';
import { DisabledCards } from './DisabledCards';
import { useNavigate } from '../hooks/navigate';
import { generateUUID } from '../utils/data';

export function CreateGame() {

  const { createGame } = useGame();
  const deviceType = useDeviceType();
  const navigate = useNavigate();

  const [disabledCards, setDisabledCards] = React.useState<{ [card: string]: boolean; }>({});
  const [disabledCardsLocalStorage, setDisabledCardsLocalStorage] = useLocalStorage('disabledCards', '{}');

  const roomCode = React.useMemo(() => {
    return generateUUID({ uppercase: true, length: 5 });
  }, []);

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

  const [showingAdvanced, setShowingAdvanced] = React.useState(false);

  const [companyName, setCompanyName] = useLocalStorage('companyName', '');

  React.useEffect(() => {
    analytics.logEvent('game_create_started', {  })
  }, [])

  return (
    <Box direction="vertical">

      <MaxWidth small>
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
              <Button onClick={() => navigate(-1)}>Back</Button>
            </Box>

            <Button 
              disabled={!companyName}
              onClick={() => {
                createGame(roomCode, companyName, { disabledCards });
                navigate(`/host/${roomCode}`); // must be done via code after create game
              }}
            >
              Create
            </Button>
            
          </Box>

        </>
      </MaxWidth>
    </Box>
  );
}