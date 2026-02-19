import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWx4E1x68e2LHSFvpIZozwPY09blRoIIE",
  authDomain: "netflix-app-28d11.firebaseapp.com",
  projectId: "netflix-app-28d11",
  storageBucket: "netflix-app-28d11.firebasestorage.app",
  messagingSenderId: "929805479250",
  appId: "1:929805479250:web:f62f5ed1fb003c43411e8b",
  measurementId: "G-Y5XZHRE71J",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
