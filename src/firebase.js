
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyDTejquxRcHfoIMg3EVNX2g2gPj2cc1kA8",
  authDomain: "whatsapp-365b7.firebaseapp.com",
  projectId: "whatsapp-365b7",
  storageBucket: "whatsapp-365b7.appspot.com",
  messagingSenderId: "1007855890196",
  appId: "1:1007855890196:web:0adc2a40778d77d9e11c01"
};



export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();