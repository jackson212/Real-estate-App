import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_GTXyoQg93D6DJLfSKtvZ9yKDJg_w9pk",
  authDomain: "sell-house-587f3.firebaseapp.com",
  projectId: "sell-house-587f3",
  storageBucket: "sell-house-587f3.appspot.com",
  messagingSenderId: "745242681645",
  appId: "1:745242681645:web:631fbfa48af2e7de2f73a4",
  measurementId: "G-YQ4HGL0VST"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyD_GTXyoQg93D6DJLfSKtvZ9yKDJg_w9pk",
//   authDomain: "sell-house-587f3.firebaseapp.com",
//   projectId: "sell-house-587f3",
//   storageBucket: "sell-house-587f3.appspot.com",
//   messagingSenderId: "745242681645",
//   appId: "1:745242681645:web:631fbfa48af2e7de2f73a4",
//   measurementId: "G-YQ4HGL0VST"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);