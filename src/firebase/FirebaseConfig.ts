import { getDatabase } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import 'firebase/compat/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: 'react-crud-841f5.firebaseapp.com',
  projectId: 'react-crud-841f5',
  storageBucket: 'react-crud-841f5.appspot.com',
  messagingSenderId: '1042609157399',
  appId: '1:1042609157399:web:a0a12f38bc791666f1f352',
};

const fbApp = initializeApp(firebaseConfig);
const auth = getAuth(fbApp);
const fbDB = getFirestore(fbApp);

export default {
  auth,
  fbApp,
  fbDB,
};

// export class FirebaseConfig {
//   private static instance: any | null = null;

//   private fbApp: any = null;

//   fbDB: any = null;

//   auth: any = null;

//   constructor() {
//     this.fbApp = initializeApp(firebaseConfig);
//     this.fbDB = getFirestore(this.fbApp);
//     this.auth = getAuth(this.fbApp);
//   }

//   static getInstance() {
//     if (this.instance == null) {
//       this.instance = new FirebaseConfig();
//     }

//     return this.instance;
//   }

// }
