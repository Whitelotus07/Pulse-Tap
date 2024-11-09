import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "AIzaSyBpDX5PJ0AdWdbFb8JeUfN04lyag8NFJwU",
  authDomain: "pulse-tap.firebaseapp.com",
  projectId: "pulse-tap",
  storageBucket: "pulse-tap.appspot.com",
  messagingSenderId: "362721898715",
  appId: "1:362721898715:web:0b4fee0f30706edb879cfe",
  measurementId: "G-5S6R1HKJD5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
