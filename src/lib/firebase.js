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

if (process.env.NODE_ENV !== "test") FS.enablePersistence({experimentalTabSynchronization: true})

export const DB = firebase.database()
export const FileStore = firebase.storage()
export const AUTH = firebase.auth()

export const TIMESTAMP_SERVER = firebase.firestore.FieldValue.serverTimestamp()
export const TIMESTAMP_CLIENT = firebase.firestore.Timestamp.now
export const GEOPOINT = (lat, long) => new firebase.firestore.GeoPoint(lat, long)

export const USERS_FS = FS.collection("users")

export default firebase