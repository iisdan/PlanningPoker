import { Box } from './components/Box';
import { Footer } from './containers/Footer';
import { Nav } from './containers/Nav';
import { Viewport } from './components/Viewport';
import { GameView } from './containers/GameView';
import { useGame } from './hooks/useGame';
import { CardSelectView } from './containers/CardSelectView';
import { Home } from './containers/Home';
import { PreGameLobby } from './containers/PreGameLobby';
import { useDeviceType } from './hooks/useDeviceType';
import { useMe } from './hooks/useMe';

function App() {

  const { game } = useGame();
  const { role } = useMe();
  const device = useDeviceType();

  const shouldVerticallyCenter = device !== 'mobile' || !Boolean(game?.phase);
  
  return (
    <Viewport>
        
      <Nav />

      <Box wrap height="100%" direction="vertical" justifyContent={shouldVerticallyCenter ? 'center' : undefined} alignItems="center" overflowY="auto">
        
        {!game && (
          <Home />
        )}

        {game?.phase === 'pre-game' && (
          <PreGameLobby />
        )}

        {role === 'player' && game?.phase !== 'pre-game' && (
          <CardSelectView />
        )}

        {role && game?.phase !== 'pre-game' && (
          <GameView />
        )}

      </Box>
      
      <Footer roomCode={game?.code || ''} />
    </Viewport>
  );
}

export default App;
