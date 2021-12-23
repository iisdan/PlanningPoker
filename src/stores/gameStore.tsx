import React, { useState } from "react"
import { Game } from '../interfaces';

const Store = React.createContext<ReturnType<typeof InitialState> | null>(null);

function InitialState() {
  const [game, setGame] = useState<Game | null>(null);

  const sessionContext = React.useMemo(() => ({ 
    game, setGame,
  }), [
    game, setGame,
  ]);

  return sessionContext;
}

export function GameStoreProvider(props: { children: React.ReactElement }) {
  const state = InitialState();
  
  return (
    <Store.Provider value={state}>
      {props.children}
    </Store.Provider>
  );
}

export function useGameStore() {
  return React.useContext(Store)!;
}
