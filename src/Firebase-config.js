import { initializeApp } from "firebase/app";

const FirebaseConfig = {
    apiKey: process.env.REACT_apiKey,
    authDomain: process.env.REACT_authDomain ,
    projectId: "tasks-site-db320",
    storageBucket: process.env.REACT_storageBucket,
    messagingSenderId: process.env.REACT_messagingSenderId,
    appId: process.env.REACT_appId,
    measurementId:process.env.REACT_measurementId}
import { getFirestore } from '@firebase/firestore'


const app = initializeApp(FirebaseConfig);

export const db = getFirestore(app)
