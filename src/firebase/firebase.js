import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDG49ATWllCs35mkn3RCE4rfYrcjuyKJG0",
  authDomain: "mawesome.firebaseapp.com",
  databaseURL: "https://mawesome.firebaseio.com",
  projectId: "mawesome",
  storageBucket: "mawesome.appspot.com",
  messagingSenderId: "190564070427",
  appId: "1:190564070427:web:0a94734c470fe735aeb4be",
  measurementId: "G-JWL2F0EX3M"
};


firebase.initializeApp(firebaseConfig)
firebase.analytics()

export const authPersistence = firebase
  .auth()
  .setPersistence(firebase.auth.Auth.Persistence.LOCAL)