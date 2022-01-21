import React, { useState } from "react"
import { Game } from '../interfaces';

const Context = React.createContext<ReturnType<typeof Store> | null>(null);

function Store() {
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  return React.useMemo(() => ({ 
    game, setGame,
    loading, setLoading,
  }), [
    game, setGame,
    loading, setLoading,
  ]);
}

export function GameStoreProvider(props: { children: React.ReactElement }) {
  return (
    <Context.Provider value={Store()}>
      {props.children}
    </Context.Provider>
  );
}

export function useGameStore() {
  return React.useContext(Context)!;
}
