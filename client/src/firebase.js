// Import the functions needed from the Firebase SDKs
import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfgguMbUwo21Znl3PntT6tU4VsID4kNlA",
  authDomain: "sales-coach-ai.firebaseapp.com",
  projectId: "sales-coach-ai",
  storageBucket: "sales-coach-ai.appspot.com",
  messagingSenderId: "863534333412",
  appId: "1:863534333412:web:3ed869299509b794319bf1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Firestore service and Authentication
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, serverTimestamp };