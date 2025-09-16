import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBfDrWEhV1pCo6M491alKT6lxg4rmzIGT0",
  authDomain: "lms-react-59538.firebaseapp.com",
  projectId: "lms-react-59538",
  storageBucket: "lms-react-59538.firebasestorage.app",
  messagingSenderId: "584806137864",
  appId: "1:584806137864:web:63091d0e6c49d71e6911bd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export {
    auth,
    db
}