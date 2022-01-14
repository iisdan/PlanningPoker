import { config } from "../config";
import { FirebaseRealtimeDBProvider } from "./providers/firebaseRealtimeDB";
import { FirestoreProvider } from "./providers/firestore";

export interface DataProvider { 
  watch: <T>(collection: string, id: string, callback: (data: T) => void) => void;
  set: (collection: string, id: string, data: any) => void;
  delete: (collection: string, id: string) => void;
}

function factory($provider: 'firestore' | 'realtimedb') {
  switch($provider) {

    /**
     * Firestore has usage costs but may be the only
     * option in the future
     */
    case 'firestore':
      return new FirestoreProvider(config.providers.firebase!);

    /**
     * Realtime database has no usage limits but
     * may be removed at some point 
     */
    case 'realtimedb':
      return new FirebaseRealtimeDBProvider(config.providers.firebase!);

  }
}

export const realtimeDatabase: DataProvider = factory(config.database.provider);
