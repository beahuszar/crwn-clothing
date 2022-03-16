import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBnGK6HKhft17PFLHuGjpcBJnABYL27pZc",
  authDomain: "crwn-clothing-db-f22db.firebaseapp.com",
  projectId: "crwn-clothing-db-f22db",
  storageBucket: "crwn-clothing-db-f22db.appspot.com",
  messagingSenderId: "135689881522",
  appId: "1:135689881522:web:f98d99457e6df56f0d06ab"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Google auth
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  promt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
