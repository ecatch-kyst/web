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
  NotFound,
  Dialog,
  Notification
} from './components'
import {useTranslation} from 'react-i18next'


export const App = ({theme: {palette: {type}}}) =>
  <div className="app" style={{backgroundColor: type === "dark" ? "#000" : ""}}>
    <Switch>
      <Route component={Landing} exact path={routes.ROOT}/>
      <Route component={Register} exact path={routes.REGISTER}/>
      <Route component={Profile} exact path={routes.PROFILE}/>
      <Route component={Dashboard} exact path={routes.DASHBOARD}/>
      <Route component={NotFound}/>
    </Switch>
    <Route
      render={({location: {pathname}}) => ![routes.ROOT, routes.REGISTER].includes(pathname) ? <Navigation value={pathname.slice(1)} /> : null}
    />
    <OfflineStatus/>
    <Dialog/>
    <Notification/>
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

export const Navigation = ({value}) => {
  const [t] = useTranslation("common")
  return (
    <BottomNavigation
      style={{position: "fixed", bottom: 0, width: "100vw"}}
      value={value}
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
  )
}