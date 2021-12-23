import React, { useState } from "react"
import { Player } from "../interfaces";

const MeStore = React.createContext<ReturnType<typeof InitialState> | null>(null);

function InitialState() {
  const [type, setType] = useState<'player' | 'host' | null>(null);
  const [me, setMe] = useState<Player | null>(null);

  const sessionContext = React.useMemo(() => ({ 
    type, setType,
    me, setMe
  }), [
    type, setType,
    me, setMe,
  ]);

  return sessionContext;
}

export function MeStoreProvider(props: { children: React.ReactElement }) {
  const state = InitialState();
  
  return (
    <MeStore.Provider value={state}>
      {props.children}
    </MeStore.Provider>
  );
}

export function useMeStore() {
  return React.useContext(MeStore)!;
}
