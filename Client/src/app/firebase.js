// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbEf0vF9B7uPI5FjHn9rcqQG5iVZjkWnI",
  authDomain: "nodemailer-woofie.firebaseapp.com",
  projectId: "nodemailer-woofie",
  storageBucket: "nodemailer-woofie.appspot.com",
  messagingSenderId: "940128995369",
  appId: "1:940128995369:web:b7ece62a7c39d52a2cf438"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()