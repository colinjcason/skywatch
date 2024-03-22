import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc, collection, addDoc, query, where, getDocs, deleteDoc, onSnapshot } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDJxad3KtlyVTVIG29ZfYgiBN2xEiYzKKw",
  authDomain: "skywatch-f0a9a.firebaseapp.com",
  projectId: "skywatch-f0a9a",
  storageBucket: "skywatch-f0a9a.appspot.com",
  messagingSenderId: "506018849766",
  appId: "1:506018849766:web:8a84cf08b4d225adf46c27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// prompt user to select sign in account 
const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGoogle = () => {
  signInWithPopup(auth, googleProvider)
    .then(result => {
      const user = result.user
    })
    .catch(error => {
      return 
    })
}

export const db = getFirestore(app)

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

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export const addToFavorites = async (userAuth, city) => {
  const userRef = doc(db, 'users', userAuth.uid);
  const favoritesRef = collection(userRef, 'favorites');

  try {
    const favoritesQuery = query(favoritesRef, where('city', '==', city));
    const querySnapshot = await getDocs(favoritesQuery);

    if (querySnapshot.empty) {
      await addDoc(favoritesRef, { city });
      alert('City added to favorites!');
      console.log('City added to favorites:', city);
    } else {
      alert('City already saved to your Favorites!');
      console.log('City already exists in favorites:', city);
    }
  } catch (error) {
    console.error('Error adding city to favorites:', error);
  }
}

export const deleteFavoriteCity = async (userAuth, cityId) => {
  try {
    const cityRef = doc(db, 'users', userAuth.uid, 'favorites', cityId);

    await deleteDoc(cityRef)
  } catch (error) {
    console.error('Error deleting city from favorites:', error);
  }
}

export const fetchFavorites = async (userAuth) => {
  try {
    const favoritesRef = await getDocs(collection(db, 'users', userAuth.uid, 'favorites'));
    const favoritesData = favoritesRef.docs.map(doc => ({
      cityId: doc.id,
      ...doc.data()
    }));
    return favoritesData;
  } catch (error) {
    console.error('Error fetching favorites:', error);
  }
};

export const listenForFavoritesChanges = (userAuth, setFavorites) => {
  const favoritesRef = collection(db, 'users', userAuth.uid, 'favorites');

  return onSnapshot(favoritesRef, (snapshot) => {
    const updatedFavorites = [];
    snapshot.forEach(doc => {
      updatedFavorites.push({ cityId: doc.id, ...doc.data() });
    });
    setFavorites(updatedFavorites);
  })
}