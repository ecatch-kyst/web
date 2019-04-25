import React from 'react'
import {Route, Switch, withRouter, Link} from "react-router-dom"

import {DashboardIcon, PresetIcon, ProfileIcon, TripIcon} from "./icons"

import {withTheme, BottomNavigation, BottomNavigationAction} from '@material-ui/core'

import {routes as ROUTES} from './lib/router'

import {
  Landing,
  Profile,
  Register,
  OfflineStatus,
  HomePage,
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

import {useTranslation} from 'react-i18next'

const routes = [
  {component: Landing, path: ROUTES.ROOT},
  {component: Register, path: ROUTES.REGISTER},
  {component: Profile, path: ROUTES.PROFILE},
  {component: HomePage, path: ROUTES.HOMEPAGE},
  {component: Preset, path: ROUTES.PRESET},
  {component: Trips, path: ROUTES.TRIPS},
  {component: Trip, path: `${ROUTES.TRIPS}/:tripId`},
  {component: Messages, path: ROUTES.MESSAGES},
  {component: EditCatch, path: `${ROUTES.MESSAGES}/:type/:messageId${ROUTES.EDIT}`},
  {component: Form, path: `${ROUTES.MESSAGES}/:type${ROUTES.NEW}`}
]

export const App = ({theme: {palette: {type}}}) =>
  <div className="app" style={{backgroundColor: type === "dark" ? "#000" : ""}}>
    <Switch>
      {routes.map(route =>
        <Route key={route.path} {...route} exact/>
      )}
      <Route component={NotFound}/>
    </Switch>
    <Route
      render={
        ({location: {pathname}}) =>
          ![routes.ROOT, routes.REGISTER].includes(pathname) ?
            <Navigation value={pathname.slice(1)} /> :
            null
      }
    />
    <OfflineStatus/>
    <Dialog/>
    <Notification/>
  </div>


export default withRouter(withTheme()(App))


const navigation = [
  {
    id: "homepage",
    icon: <DashboardIcon/>,
    to: ROUTES.HOMEPAGE
  },
  {
    id: "trips",
    icon: <TripIcon/>,
    to: ROUTES.TRIPS
  },
  {
    id: "profile",
    icon: <ProfileIcon/>,
    to: ROUTES.PROFILE
  },
  {
    id: "preset",
    icon: <PresetIcon/>,
    to: ROUTES.PRESET
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