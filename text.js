// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDJm97YUvLdISOSzBBYUY-06h5zfDPvJ5w",
    authDomain: "gamebyte-d6342.firebaseapp.com",
    projectId: "gamebyte-d6342",
    storageBucket: "gamebyte-d6342.appspot.com",
    messagingSenderId: "940859023117",
    appId: "1:940859023117:web:86577b1abbb292b925da44",
    measurementId: "G-R0H0W0VP0T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage();
const storageRef = ref(storage);
