import firebase from "@firebase/app"
import "@firebase/database"
import "@firebase/firestore"
import "@firebase/auth"
import "@firebase/storage"

firebase.initializeApp({
  apiKey: "AIzaSyD5l09unKGP3D3cFY_mr_BQPgcTjhkU2jc",
  authDomain: "ecatch-kyst.firebaseapp.com",
  databaseURL: "https://ecatch-kyst.firebaseio.com",
  projectId: "ecatch-kyst",
  storageBucket: "ecatch-kyst.appspot.com",
  messagingSenderId: "1037945604073"
})

export const FS = firebase.firestore()
export const DB = firebase.database()
export const FileStore = firebase.storage()
export const AUTH = firebase.auth()

export const TIMESTAMP = firebase.firestore.FieldValue.serverTimestamp()

export default firebase