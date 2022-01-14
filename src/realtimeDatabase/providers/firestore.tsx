import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { DataProvider } from '..';

export class FirestoreProvider implements DataProvider {

  private app: firebase.app.App;

  constructor(config: object) {
    this.app = firebase.initializeApp(config);
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