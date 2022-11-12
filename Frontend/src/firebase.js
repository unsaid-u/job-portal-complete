import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC529Q8Y9lhpn17y8T1SXpE5sDlLejGe9Q",
  authDomain: "job-portal-f4cbc.firebaseapp.com",
  projectId: "job-portal-f4cbc",
  storageBucket: "job-portal-f4cbc.appspot.com",
  messagingSenderId: "899391928871",
  appId: "1:899391928871:web:8dda0f8e8f1f0187df6c02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);