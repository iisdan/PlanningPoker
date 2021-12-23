import { Box } from './components/Box';
import { Footer } from './containers/Footer';
import { Nav } from './containers/Nav';
import { Viewport } from './components/Viewport';
import { GameView } from './containers/GameView';
import { Provider, useSession, useSessionNew } from './state/session';
import { CardSelectView } from './containers/CardSelectView';
import { Home } from './containers/Home';
import { PreGameLobby } from './containers/PreGameLobby';
import { useDeviceType } from './hooks/useDeviceType';
import { useEffect } from 'react';

function App() {

  const session = useSession();
  const game = session.game;
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

        {session.type === 'player' && game?.phase !== 'pre-game' && (
          <CardSelectView />
        )}

        {session.type && game?.phase !== 'pre-game' && (
          <GameView />
        )}

      </Box>
      
      <Footer roomCode={game?.code || ''} />
    </Viewport>
  );
}

export default App;
