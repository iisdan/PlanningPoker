import firebase from 'firebase/compat/app'
import { getDatabase, ref, set, onValue, remove } from "firebase/database";
// import "firebase/compat/analytics";
import { DataProvider } from '..';
//import { getAnalytics } from "firebase/analytics";
import { getAnalytics } from "firebase/analytics";
// import { getAnalytics, logEvent } from "firebase/analytics";

export class FirebaseRealtimeDBProvider implements DataProvider {

  private app: firebase.app.App;
  // private analytics: Analytics;

  constructor(config: object) {
    this.app = firebase.initializeApp(config);
    // this.app.analytics()
    getAnalytics(this.app);
    // analyitics.app.automaticDataCollectionEnabled = true

  }

  public logEvent(eventName: string, params: any) {
    // const analytics = getAnalytics(this.app);
    // logEvent(analytics, eventName, params);
    // const analytics = this.app.analytics();
    // analytics.logEvent(eventName, params);
  }

  public watch(collection: string, id: string, callback: (data: any) => void) {
    const db = getDatabase(this.app);
    const starCountRef = ref(db, `${collection}/${id}`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      callback(data);
    });
  }

  public set(collection: string, id: string, data: any) {
    const db = getDatabase();
    const document = ref(db, `${collection}/${id}`);
    set(document, data);
  }

  public delete(collection: string, id: string) {
    const db = getDatabase();
    const document = ref(db, `${collection}/${id}`);
    remove(document);
  }

}