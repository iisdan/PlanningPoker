import { Box } from './components/Box';
import { Footer } from './containers/Footer';
import { Nav } from './containers/Nav';
import { Viewport } from './components/Viewport';
import { GameView } from './containers/GameView';
import { useSession } from './state/session';
import { CardSelectView } from './containers/CardSelectView';
import { Home } from './containers/Home';
import { PreGameLobby } from './containers/PreGameLobby';
import { useDeviceType } from './hooks/useDeviceType';

function App() {

  // todo: change useSession to use useConext rather than passing this around 
  const session = useSession();
  const game = session.game;
  const device = useDeviceType();

  const shouldVerticallyCenter = device !== 'mobile' || !Boolean(game?.phase);
  
  return (
    <Viewport>
        
      <Nav />

      <Box wrap height="100%" direction="vertical" justifyContent={shouldVerticallyCenter ? 'center' : undefined} alignItems="center" overflowY="auto">
        
        {!game && (
          <Home session={session} />
        )}

        {game?.phase === 'pre-game' && (
          <PreGameLobby role={session.type!} session={session} />
        )}

        {session.type === 'host' && game?.phase !== 'pre-game' && (
          <GameView role='host' session={session} />
        )}

        {session.type === 'player' && game?.phase !== 'pre-game' && (
          <>
            <CardSelectView session={session} />
            <GameView role='player' session={session} />
          </>
        )}

      </Box>
      
      <Footer roomCode={game?.code || ''} />
    </Viewport>
  );
}

export default App;
