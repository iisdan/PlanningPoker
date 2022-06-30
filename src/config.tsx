interface Config {
  database: {
    provider: 'realtimedb' | 'firestore';
  },
  analytics: {
    provider: 'firebase';
    collectLocally: boolean,
  },
  providers: {
    firebase?: {
      apiKey: string,
      authDomain: string,
      projectId: string,
      storageBucket: string,
      messagingSenderId: string,
      appId: string,
      measurementId: string,
    },
  },
  newUserDefaults: {
    profileImage: string;
    role: string;
  },
}

export const config: Config = {
  database: {
    provider: 'firestore',
  },
  analytics: {
    provider: 'firebase',
    collectLocally: false,
  },
  providers: {
    firebase: {
      apiKey: "AIzaSyDVvpgDCUSUmbOT-mofAgjE8xxKZRFhDm8",
      authDomain: "planningpoker-9fdfc.firebaseapp.com",
      projectId: "planningpoker-9fdfc",
      storageBucket: "planningpoker-9fdfc.appspot.com",
      messagingSenderId: "706880550220",
      appId: "1:706880550220:web:18e7cdb56259c2d28c8be9",
      measurementId: "G-PY31M8VPZF"
    },
  },
  newUserDefaults: {
    profileImage: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/2-space-cat-riding-unicorn-laser-tacos-and-rainbow-random-galaxy.jpg',
    role: 'Developer',
  },
}