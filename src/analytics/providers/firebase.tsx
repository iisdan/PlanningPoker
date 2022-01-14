import firebase from 'firebase/compat/app'
import { AnalyticsProvider } from '..';
import { getAnalytics, logEvent, Analytics } from "firebase/analytics";
import { config } from '../../config';

export class FirebaseAnalyticsProvider implements AnalyticsProvider {

  private app: firebase.app.App;
  private analytics: Analytics;
  private local: boolean;

  constructor(config: object) {
    this.app = firebase.initializeApp(config);
    this.analytics = getAnalytics(this.app);
    this.local = window.location.href.indexOf('local') !== -1;
  }

  public logEvent(eventName: string, params?: any) {
    if (!this.local || config.analytics.collectLocally) {
      logEvent(this.analytics, eventName, params);
    }
  }

}