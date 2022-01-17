import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { GameStoreProvider } from './stores/gameStore';
import { MeStoreProvider } from './stores/meStore';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <MeStoreProvider>
      <GameStoreProvider>
        <App />
      </GameStoreProvider>
    </MeStoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
