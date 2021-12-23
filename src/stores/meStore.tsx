import React, { useState } from "react"
import { Player } from "../interfaces";

const MeStore = React.createContext<ReturnType<typeof InitialState> | null>(null);

function InitialState() {
  const [role, setRole] = useState<'player' | 'host' | null>(null);
  const [me, setMe] = useState<Player | null>(null);

  const sessionContext = React.useMemo(() => ({ 
    role, setRole,
    me, setMe
  }), [
    role, setRole,
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
