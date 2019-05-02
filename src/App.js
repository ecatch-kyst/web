import React from 'react'
import {Route, Switch, withRouter, Redirect} from "react-router-dom"

import {withTheme} from '@material-ui/core'

import {routes as ROUTES} from './lib/router'

import {
  Landing,
  Profile,
  Register,
  OfflineStatus,
  Home,
  NotFound,
  Dialog,
  Trips,
  Messages,
  Trip,
  EditCatch,
  Form,
  Notification,
  Preset
} from './components'

import Navigation from './Navigation'


// Define new pages here
const routes = [
  {component: Landing, path: ROUTES.ROOT},
  {component: Register, path: ROUTES.REGISTER}, // REVIEW: Delete?
  {component: Profile, path: ROUTES.PROFILE},
  {component: Home, path: ROUTES.HOMEPAGE},
  {component: Preset, path: ROUTES.PRESET},
  {component: Trips, path: ROUTES.TRIPS},
  {component: Trip, path: `${ROUTES.TRIPS}/:tripId`},
  {component: Messages, path: ROUTES.MESSAGES},
  {component: EditCatch, path: `${ROUTES.MESSAGES}/:type/:messageId${ROUTES.EDIT}`},
  {component: Form, path: `${ROUTES.MESSAGES}/:type${ROUTES.NEW}`}
]

export default withRouter(withTheme()(({theme: {palette: {type}}}) =>
  <div className={`app ${type === "dark" ? "dark" : ""}`}>
    <Route component={Navigation}/>
    <Switch>
      {routes.map(route =>
        <Route key={route.path} {...route} exact/>
      )}
      <Route component={NotFound}/>
    </Switch>
    <OfflineStatus/>
    <Dialog/>
    <Notification/>
    <FirstTimeRedirect/>
  </div>
))


/**
 * If the user opens the page for the first time,
 * they will be redirected to the PRESET page.
 */
const FirstTimeRedirect = () => {
  if (!localStorage.getItem("noRedirect")) {
    localStorage.setItem("noRedirect", 1)
    return <Redirect to={ROUTES.PRESET}/>
  }
  return null
}