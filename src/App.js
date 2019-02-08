import React from 'react'
import {Route, Switch, withRouter, Link} from "react-router-dom"

import {routes} from './lib/router'

import {
  Landing,
  Profile,
  Register,
  OfflineStatus,
  Dashboard,
  NotFound
} from './components'
import {withTranslation} from 'react-i18next'


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