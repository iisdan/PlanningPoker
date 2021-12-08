import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { DataProvider } from '..';
import { getAnalytics, logEvent, Analytics } from "firebase/analytics";

export class FirestoreProvider implements DataProvider {

  private app: firebase.app.App;
  private analytics: Analytics;

  constructor(config: object) {
    this.app = firebase.initializeApp(config);
    this.analytics = getAnalytics(this.app);
  }

  public logEvent(eventName: string, params?: any) {
    const isLocal = window.location.href.indexOf('local') !== -1;
    if (!isLocal) {
      logEvent(this.analytics, eventName, params);
    }
  }

  public watch(collection: string, id: string, callback: (data: any) => void) {
    const docRef = firebase.firestore(this.app).collection(collection).doc(id);
    docRef.onSnapshot(async (snapshot) => {
      const data = snapshot.data();
      callback(data);
    });
  }

  public set(collection: string, id: string, data: any) {
    const document = firebase.firestore(this.app).collection(collection).doc(id);
    document.set(data);
  }

  public delete(collection: string, id: string) {
    const docRef = firebase.firestore(this.app).collection(collection).doc(id);
    docRef.delete();
  }

}