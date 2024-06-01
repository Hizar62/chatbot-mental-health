import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, onSnapshot } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCxRfI1lt9Hi2_9u4yW0a7nlNguLH4ifmU",
  authDomain: "chatbot-bc48f.firebaseapp.com",
  databaseURL: "https://chatbot-bc48f-default-rtdb.firebaseio.com",
  projectId: "chatbot-bc48f",
  storageBucket: "chatbot-bc48f.appspot.com",
  messagingSenderId: "341215462688",
  appId: "1:341215462688:web:3f03a7339e5f654b720345"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { app, firestore, auth, analytics , database};
