import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_KEY,
    authDomain: "react-estate-5207e.firebaseapp.com",
    projectId: "react-estate-5207e",
    storageBucket: "react-estate-5207e.appspot.com",
    messagingSenderId: "434530387272",
    appId: "1:434530387272:web:d682641cd7457e2a405f7d",
    measurementId: "G-ZSEYBVR3YW"
};

export const app = initializeApp(firebaseConfig);