import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { GameStoreProvider } from './stores/gameStore';
import { MeStoreProvider } from './stores/meStore';

ReactDOM.render(
  <React.StrictMode>
    <MeStoreProvider>
      <GameStoreProvider>
        <App />
      </GameStoreProvider>
    </MeStoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
