import React, { useState } from "react"
import { Game } from '../interfaces';

const Store = React.createContext<ReturnType<typeof InitialState> | null>(null);

function InitialState() {
  const [game, setGame] = useState<Game | null>(null);

  return React.useMemo(() => ({ 
    game, setGame,
  }), [
    game, setGame,
  ]);
}

export function GameStoreProvider(props: { children: React.ReactElement }) {
  return (
    <Store.Provider value={InitialState()}>
      {props.children}
    </Store.Provider>
  );
}

export function useGameStore() {
  return React.useContext(Store)!;
}
