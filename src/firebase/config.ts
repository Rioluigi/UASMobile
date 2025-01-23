import {FirebaseApp, initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBYSCgt_PFJpUZVn8s52GhJkUYYIciGYks',
  authDomain: 'wingss-c467f.firebaseapp.com',
  projectId: 'wingss-c467f',
  storageBucket: 'wingss-c467f.firebasestorage.app',
  messagingSenderId: '1046776320272',
  appId: '1:1046776320272:web:2eb35cc96313eaf4bf9595',
  measurementId: 'G-JVRC3LSTQL',
};

const app: FirebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
