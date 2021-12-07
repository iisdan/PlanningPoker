interface Config {
  dataProvider: 'realtimedb' | 'firestore';
  firebase: object;
}

export const config: Config = {
  dataProvider: 'realtimedb',
  firebase: {
    apiKey: "AIzaSyDVvpgDCUSUmbOT-mofAgjE8xxKZRFhDm8",
    authDomain: "planningpoker-9fdfc.firebaseapp.com",
    projectId: "planningpoker-9fdfc",
    storageBucket: "planningpoker-9fdfc.appspot.com",
    messagingSenderId: "706880550220",
    appId: "1:706880550220:web:18e7cdb56259c2d28c8be9",
    measurementId: "G-PY31M8VPZF"
  },
}