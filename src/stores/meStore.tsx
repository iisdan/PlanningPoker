import React, { useState } from "react"
import { Player } from "../interfaces";

const MeStore = React.createContext<ReturnType<typeof InitialState> | null>(null);

function InitialState() {
  const [role, setRole] = useState<'player' | 'host' | null>(null);
  const [me, setMe] = useState<Player | null>(null);

  return React.useMemo(() => ({ 
    role, setRole,
    me, setMe
  }), [
    role, setRole,
    me, setMe,
  ]);
}

export function MeStoreProvider(props: { children: React.ReactElement }) {
  return (
    <MeStore.Provider value={InitialState()}>
      {props.children}
    </MeStore.Provider>
  );
}

export function useMeStore() {
  return React.useContext(MeStore)!;
}
