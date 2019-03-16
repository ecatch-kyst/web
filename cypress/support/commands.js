// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import {attachCustomCommands} from 'cypress-firebase'

const fbConfig = {
  apiKey: "AIzaSyD5l09unKGP3D3cFY_mr_BQPgcTjhkU2jc",
  authDomain: "ecatch-kyst.firebaseapp.com",
  databaseURL: "https://ecatch-kyst.firebaseio.com",
  projectId: "ecatch-kyst",
  storageBucket: "ecatch-kyst.appspot.com"
}

window.fbInstance = firebase.initializeApp(fbConfig)

attachCustomCommands({Cypress, cy, firebase})
Cypress.Commands.add('login', () => {
  return firebase
    .auth()
    .signInWithEmailAndPassword('p@p.io', '123456')
})

Cypress.Commands.add('logout', () => {
  return firebase
    .auth()
    .signOut()
})