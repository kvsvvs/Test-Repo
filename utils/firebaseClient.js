import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAy84QRE5BIhQmdQ3NxW1051MmtRf97q0o",
  authDomain: "trading-app-27f91.firebaseapp.com",
  projectId: "trading-app-27f91",
  storageBucket: "trading-app-27f91.appspot.com",
  messagingSenderId: "73279161205",
  appId: "1:73279161205:web:83936aed2dd9de9134c93c",
  measurementId: "G-XF7FSHGBF6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
