import { config } from "../config";
import { FirebaseAnalyticsProvider } from "./providers/firebase";

export interface AnalyticsProvider { 
  logEvent: (eventName: string, params?: any) => void;
}

function factory($provider: 'firebase') {
  switch($provider) {

    /**
     * Firestore has usage costs but may be the only
     * option in the future
     */
    case 'firebase':
      return new FirebaseAnalyticsProvider(config.providers.firebase!);

  }
}

export const analytics: AnalyticsProvider = factory(config.analytics.provider);
