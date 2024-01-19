

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXu3gcyDQFKnpIXqLuOEtcMcN4G6HNPiA",
  authDomain: "ajincodew-a61d8.firebaseapp.com",
  projectId: "ajincodew-a61d8",
  storageBucket: "ajincodew-a61d8.appspot.com",
  messagingSenderId: "1057022551227",
  appId: "1:1057022551227:web:bc50156494feff970d359e",
  measurementId: "G-87W1H8Z593"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


firebase.initializeApp(firebaseConfig); //initialize firebase app 
module.exports = { firebase }; //export the app