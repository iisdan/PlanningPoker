import firebase from 'firebase/compat/app'
import { getDatabase, ref, set, onValue, remove } from "firebase/database";
import { DataProvider } from '..';

export class FirebaseRealtimeDBProvider implements DataProvider {

  private app: firebase.app.App;

  constructor(config: object) {
    this.app = firebase.initializeApp(config);
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