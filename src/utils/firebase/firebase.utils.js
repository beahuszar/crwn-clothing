import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

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
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  promt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();
    
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt
      });
    } catch (e) {
      console.error("error creating the user ", e.message);
    }
  }
  
  return userDocRef;
};
