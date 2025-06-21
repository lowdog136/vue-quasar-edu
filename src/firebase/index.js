import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { initEventTable, clearEventTable, addEventTableRecord } from './initEventTable'

const firebaseConfig = {
  apiKey: 'AIzaSyDrf5-3zYXtRO2e5cb1LNoBzou_WNdFdYU',
  authDomain: 'sf-quasar-aut.firebaseapp.com',
  projectId: 'sf-quasar-aut',
  storageBucket: 'sf-quasar-aut.appspot.com',
  messagingSenderId: '912819178667',
  appId: '1:912819178667:web:4d5a697cf7a9db3333fbee'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
export { auth, db, GoogleAuthProvider, initEventTable, clearEventTable, addEventTableRecord }
