import firebase from "@firebase/app"
import "@firebase/database"
import "@firebase/firestore"
import "@firebase/auth"
import "@firebase/storage"


const config = {
  apiKey: "AIzaSyD5l09unKGP3D3cFY_mr_BQPgcTjhkU2jc",
  authDomain: "ecatch-kyst.firebaseapp.com",
  databaseURL: "https://ecatch-kyst.firebaseio.com",
  projectId: "ecatch-kyst",
  storageBucket: "ecatch-kyst.appspot.com",
  messagingSenderId: "1037945604073"
}

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app()

export const FS = firebase.firestore()
FS.enablePersistence()
  .catch(({code}) => {
    switch (code) {
    case 'failed-precondition':
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a time.
      break
    case 'unimplemented':
      // The current browser does not support all of the
      // features required to enable persistence
      break
    default:
      break
    }
  })
export const DB = firebase.database()
export const FileStore = firebase.storage()
export const AUTH = firebase.auth()

export const TIMESTAMP_SERVER = firebase.firestore.FieldValue.serverTimestamp()
export const TIMESTAMP_CLIENT = firebase.firestore.Timestamp.now
export const GEOPOINT = (lat, long) => new firebase.firestore.GeoPoint(lat, long)

export const CONNECTION_REF = DB.ref(".info/connected")
export const USERS_FS = FS.collection("users")