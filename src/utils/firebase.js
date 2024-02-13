import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDJxad3KtlyVTVIG29ZfYgiBN2xEiYzKKw",
  authDomain: "skywatch-f0a9a.firebaseapp.com",
  projectId: "skywatch-f0a9a",
  storageBucket: "skywatch-f0a9a.appspot.com",
  messagingSenderId: "506018849766",
  appId: "1:506018849766:web:8a84cf08b4d225adf46c27"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

// prompt user to select sign in account 
const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)

  // if user does not exist, set user doc in database
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      })
    } catch (error) {
      console.log(error)
    }
  }

  // is user already exists, just return the user reference
  return userDocRef
}

export const signOutUser = async () => await signOut(auth)