// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAZF5x83onJpZcWGGhFo53fKIZ6iln07yQ",
    authDomain: "evalreact-f530d.firebaseapp.com",
    projectId: "evalreact-f530d",
    storageBucket: "evalreact-f530d.appspot.com",
    messagingSenderId: "380276406958",
    appId: "1:380276406958:web:23efa0a1c326024caecb3f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;