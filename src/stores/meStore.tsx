import React, { useState } from "react"
import { Player } from "../interfaces";

const Context = React.createContext<ReturnType<typeof Store> | null>(null);

function Store() {
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
    <Context.Provider value={Store()}>
      {props.children}
    </Context.Provider>
  );
}

export function useMeStore() {
  return React.useContext(Context)!;
}
