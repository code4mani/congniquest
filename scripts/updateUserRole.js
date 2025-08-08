// updateUserRole.js
// Usage: node updateUserRole.js <userId> <role>

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const [,, userId, role] = process.argv;

if (!userId || !role) {
  console.error('Usage: node updateUserRole.js <userId> <role>');
  process.exit(1);
}

async function updateUserRole() {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, { role });
    console.log(`User ${userId} role updated to ${role}`);
  } catch (err) {
    console.error('Error updating user role:', err);
  }
}

updateUserRole();
