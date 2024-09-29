// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuzlz4nrhhSyybqvu_iVRtsBqNF_S8hDM",
  authDomain: "rehlo-auth.firebaseapp.com",
  projectId: "rehlo-auth",
  storageBucket: "rehlo-auth.appspot.com",
  messagingSenderId: "906445885945",
  appId: "1:906445885945:web:d71f30a06d058134be2d28",
  measurementId: "G-4EZTCMRF9X"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);