import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyBUHuglycFtxmvViwSU0RtG4n-b6Djw0tY",
  authDomain: "crwn-db-7c663.firebaseapp.com",
  projectId: "crwn-db-7c663",
  storageBucket: "crwn-db-7c663.appspot.com",
  messagingSenderId: "146027473093",
  appId: "1:146027473093:web:2ac6fabe233e461b00e8ac",
  measurementId: "G-EFFBX14FCJ"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;





