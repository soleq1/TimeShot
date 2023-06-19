
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyCuxt0b-bnCejIx2XGzatK1fdqLQW4lfoE",
  authDomain: "auth-813f9.firebaseapp.com",
  projectId: "auth-813f9",
  storageBucket: "auth-813f9.appspot.com",
  messagingSenderId: "263439356277",
  appId: "1:263439356277:web:ab8f1d938e251e9839033c",
  measurementId: "G-E880BNMB0C"
};
// Initialize Firebase
  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app
