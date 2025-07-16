import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Optionally import the services that you want to use
// import {...} from 'firebase/auth';
// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBj6HcFZJVTH3oxSCZupZQpPALNN4b3v0c",
  authDomain: "turopero-gualeguaychu.firebaseapp.com",
  projectId: "turopero-gualeguaychu",
  storageBucket: "turopero-gualeguaychu.firebasestorage.app",
  messagingSenderId: "204361638845",
  appId: "1:204361638845:web:6c655ec2292cb8edc068d4",
  measurementId: "G-WW8EBCBZ8W"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);
// const storage = getStorage(app);

export { auth, db, app };