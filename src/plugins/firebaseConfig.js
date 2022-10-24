// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJC6OW2VkZWBVDCH0Gvj38LMFS2TMr4_Y",
  authDomain: "flag-app-v2.firebaseapp.com",
  projectId: "flag-app-v2",
  storageBucket: "flag-app-v2.appspot.com",
  messagingSenderId: "431884855980",
  appId: "1:431884855980:web:c05a17e21060e06ccf4d09"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp; //ここだけ追記＆appから名前変えたよ
