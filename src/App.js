import React from 'react'
import {Route, Switch, withRouter} from "react-router-dom"
import NotFound from './components/NotFound'
import {routes} from './lib/router'
import {withTheme} from '@material-ui/core'
import Landing from './components/Landing'

import OfflineStatus from './components/OfflineStatus'
import Register from './components/Register'
import Profile from './components/Profile'
import Dashboard from './components/Dashboard'
  OfflineStatus,

const App = ({theme: {palette: {type}}}) =>
  <div style={{backgroundColor: type === "dark" ? "#000" : "", minHeight: "100vh"}}>
    <Switch>
      <Route component={Landing} exact path={routes.ROOT}/>
      <Route component={Register} exact path={routes.REGISTER}/>
      <Route component={Profile} exact path={routes.PROFILE}/>
      <Route component={Dashboard} exact path={routes.DASHBOARD}/>
      <Route component={NotFound}/>
    </Switch>
    <OfflineStatus/>
  </div>

export default withRouter(withTheme()(App))