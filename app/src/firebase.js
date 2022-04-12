import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const app = initializeApp({
  apiKey: "AIzaSyDZkouQ4BnfkwMqfFYuwxcJ31SNz2JI8eo",
  authDomain: "free-tabata.firebaseapp.com",
  projectId: "free-tabata",
  storageBucket: "free-tabata.appspot.com",
  messagingSenderId: "350441624549",
  appId: "1:350441624549:web:903d72ae14f06a2446150c",
  measurementId: "G-4NVL759P32"
})

export const auth = getAuth(app)
export const firestore = getFirestore(app)