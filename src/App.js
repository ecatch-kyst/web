import React from 'react'
import {Route, Switch, withRouter} from "react-router-dom"

import {withTheme} from '@material-ui/core'

import {routes as ROUTES} from './lib/router'

import {
  Landing,
  Profile,
  // Register, REVIEW: Delete?
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

const routes = [
  {component: Landing, path: ROUTES.ROOT},
  // {component: Register, path: ROUTES.REGISTER}, // REVIEW: Delete?
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
  <div className="app" style={{backgroundColor: type === "dark" ? "#000" : ""}}>
    <Switch>
      {routes.map(route =>
        <Route key={route.path} {...route} exact/>
      )}
      <Route component={NotFound}/>
    </Switch>
    <Route component={Navigation}/>
    <OfflineStatus/>
    <Dialog/>
    <Notification/>
  </div>
))