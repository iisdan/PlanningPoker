import React, { useState } from "react"
import { Player } from "../interfaces";

const Context = React.createContext<ReturnType<typeof Store> | null>(null);

function Store() {
  const [me, setMe] = useState<Player | undefined>(undefined);

  return React.useMemo(() => ({ 
    me, setMe
  }), [
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
