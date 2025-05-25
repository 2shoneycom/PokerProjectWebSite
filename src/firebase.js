// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "pokerproject-7ffb0.firebaseapp.com",
  databaseURL: "https://pokerproject-7ffb0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pokerproject-7ffb0",
  storageBucket: "pokerproject-7ffb0.firebasestorage.app",
  messagingSenderId: "1022865872304",
  appId: "1:1022865872304:web:f0f18cdb8ce6b29912f275",
  measurementId: "G-5ZNMXDX593"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Access Firebase Service
const auth = getAuth(app);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();

// Additional Configuration
// auth.languageCode = 'it';

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      return user;
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      throw error;
    });
};

export { auth, analytics };