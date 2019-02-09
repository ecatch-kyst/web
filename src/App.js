import React from 'react'
import {Route, Switch, withRouter, Link} from "react-router-dom"

import ProfileIcon from "@material-ui/icons/PersonOutlineOutlined"
import DashboardIcon from "@material-ui/icons/DashboardOutlined"

import {withTheme, BottomNavigation, BottomNavigationAction} from '@material-ui/core'

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
  <div className="app" style={{backgroundColor: type === "dark" ? "#000" : ""}}>
    <Switch>
      <Route component={Landing} exact path={routes.ROOT}/>
      <Route component={Register} exact path={routes.REGISTER}/>
      <Route component={Profile} exact path={routes.PROFILE}/>
      <Route component={Dashboard} exact path={routes.DASHBOARD}/>
      <Route component={NotFound}/>
    </Switch>
    <Route
      component={({location: {pathname}}) => pathname !== "/" ? <Navigation/> : null}
      path="/"
    />
    <OfflineStatus/>
  </div>

export default withRouter(withTheme()(App))


const navigation = [
  {
    id: "dashboard",
    icon: <DashboardIcon/>,
    to: routes.DASHBOARD
  },
  {
    id: "profile",
    icon: <ProfileIcon/>,
    to: routes.PROFILE
  }
]

export const Navigation = withTranslation("common")(withRouter(
  ({t, location: {pathname}}) =>
    <BottomNavigation
      style={{position: "fixed", bottom: 0, width: "100vw"}}
      value={pathname.replace("/", "")}
    >
      {navigation.map(({id, icon, to}) =>
        <BottomNavigationAction
          component={Link}
          icon={icon}
          key={id}
          label={t(`navigation.${id}`)}
          to={to}
          value={id}
        />
      )}
    </BottomNavigation>
))