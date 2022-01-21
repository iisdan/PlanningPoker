import { Routes, Route } from "react-router-dom";
import { Box } from './components/Box';
import { Footer } from './containers/Footer';
import { Nav } from './containers/Nav';
import { Viewport } from './components/Viewport';
import { GameView } from './containers/GameView';
import { useGame } from './hooks/useGame';
import { Home } from './containers/Home';
import { useDeviceType } from './hooks/useDeviceType';
import { JoinGame } from "./containers/joinGame";
import { CreateGame } from "./containers/CreateGame";
import React from "react";
import { getLocal } from "./utils/localstorage";
import { Player } from "./interfaces";
import { generateUUID } from "./utils/data";
import { useMe } from "./hooks/useMe";

function App() {

  const { game } = useGame();
  const { setMe } = useMe();
  const device = useDeviceType();

  const shouldVerticallyCenter = device !== 'mobile' || !Boolean(game?.phase);

  React.useEffect(() => {
    let me = getLocal<Player>('me');
    if (me) {
      // re-generate UUID for joining multiple times on one device
      me.id = generateUUID();
      setMe(me);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  return (
    <Viewport>
        
      <Nav />

      <Box wrap height="100%" direction="vertical" justifyContent={shouldVerticallyCenter ? 'center' : undefined} alignItems="center" overflowY="auto">
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/host/:roomId" element={<GameView role="host" />} />
          <Route path="/play/:roomId" element={<GameView role="player" />} />
          <Route path="/join/:roomId" element={<JoinGame />} />
          <Route path="/join" element={<JoinGame />} />
          <Route path="/new" element={<CreateGame />} />
        </Routes>

      </Box>
      
      <Footer roomCode={game?.code || ''} />
    </Viewport>
  );
}

export default App;
