import React from 'react'
import {Route, Switch, withRouter, Link} from "react-router-dom"

import ProfileIcon from "@material-ui/icons/PersonOutlineOutlined"
import DashboardIcon from "@material-ui/icons/DashboardOutlined"
import DepartureIcon from "@material-ui/icons/DirectionsBoatOutlined"
import MessageIcon from "@material-ui/icons/ModeCommentOutlined"

import {withTheme, BottomNavigation, BottomNavigationAction} from '@material-ui/core'

import {routes} from './lib/router'

import {
  Landing,
  Profile,
  Register,
  OfflineStatus,
  Dashboard,
  Departure,
  NotFound,
  Dialog,
  Messages
} from './components'
import {withTranslation} from 'react-i18next'


export const App = ({theme: {palette: {type}}}) =>
  <div className="app" style={{backgroundColor: type === "dark" ? "#000" : ""}}>
    <Switch>
      <Route component={Landing} exact path={routes.ROOT}/>
      <Route component={Register} exact path={routes.REGISTER}/>
      <Route component={Profile} exact path={routes.PROFILE}/>
      <Route component={Dashboard} exact path={routes.DASHBOARD}/>
      <Route component={Departure} exact path={routes.DEPARTURE}/>
      <Route component={Messages} exact path={routes.MESSAGES}/>
      <Route component={NotFound}/>
    </Switch>
    <Route
      render={({location: {pathname}}) => ![routes.ROOT, routes.REGISTER].includes(pathname) ? <Navigation/> : null}
    />
    <OfflineStatus/>
    <Dialog/>
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
  },
  {
    id: "messages",
    icon: <MessageIcon/>,
    to: routes.MESSAGES
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