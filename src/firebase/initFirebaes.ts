import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import firebaseConfig from "./firebaseConfig"

const app = firebase.initializeApp(firebaseConfig)
const firebaseAuth = app.auth()
const firestore = app.firestore()
export { firebaseAuth, firestore }