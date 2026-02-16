import { initializeApp } from 'firebase/app'
import { 
  getFirestore, 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  where,
  doc,
  deleteDoc,
  getDocs
} from 'firebase/firestore'
import { 
  initializeAuth, 
  getReactNativePersistence, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  updateProfile,
  deleteUser 
} from 'firebase/auth'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
  apiKey: "AIzaSyAmudLfCvM2cBzIQ569fFha2lhQnUgdA-w",
  authDomain: "randommagic-5b97a.firebaseapp.com",
  projectId: "randommagic-5b97a",
  storageBucket: "randommagic-5b97a.firebasestorage.app",
  messagingSenderId: "132539030619",
  appId: "1:132539030619:web:641c256c36eb2672c4b37e"
};

// Initialisation
const app = initializeApp(firebaseConfig)
const db = getFirestore(app) // Définit la base de données
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})

// --- AUTHENTIFICATION ---
export const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password)
export const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password)
export const signOutUser = () => signOut(auth)
export const onAuthStateChangedListener = callback => onAuthStateChanged(auth, callback)
export const getCurrentUserUid = () => auth.currentUser ? auth.currentUser.uid : null

// --- GESTION DE LA COLLECTION ---
export const addCollection = entry => addDoc(collection(db, 'Collection'), entry)

export const getUserCards = (userId, callback) => {
  const q = query(collection(db, 'Collection'), where('user_id', '==', userId), orderBy('date', 'desc'))
  return onSnapshot(q, snapshot => {
    let userCards = []
    snapshot.docs.forEach(doc => {
      userCards.push({ id: doc.id, ...doc.data() })
    })
    callback(userCards)
  })
}

export const removeFromCollection = (docId) => deleteDoc(doc(db, 'Collection', docId))

// --- SUPPRESSION DE COMPTE ---
export const deleteUserProfile = async () => {
  const userId = auth.currentUser?.uid
  if (!userId) throw new Error('Utilisateur non connecté')

  const q = query(collection(db, 'Collection'), where('user_id', '==', userId))
  const snapshot = await getDocs(q)
  for (const docSnap of snapshot.docs) {
    await deleteDoc(docSnap.ref)
  }
  await deleteUser(auth.currentUser)
}

export const updateUserProfile = async (displayName) => {
  if (auth.currentUser) {
    try {
      await updateProfile(auth.currentUser, { displayName: displayName })
      console.log('Profil mis à jour !')
    } catch (error) {
      console.error('Erreur mise à jour profil:', error)
      throw error
    }
  }
}

// --- TRADUCTION ERREURS ---
export const mapAuthErrorToMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/invalid-email': return "L'adresse email n'est pas valide."
    case 'auth/invalid-credential': return "Identifiant ou mot de passe incorrect."
    case 'auth/email-already-in-use': return "Cette adresse email est déjà utilisée."
    case 'auth/weak-password': return "Le mot de passe est trop court."
    default: return "Une erreur est survenue."
  }
}