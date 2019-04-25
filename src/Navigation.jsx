import React from 'react';
import {Link} from "react-router-dom"
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import {HomeIcon, PresetIcon, ProfileIcon, TripIcon} from "./icons"
import {useTranslation} from 'react-i18next'
import {routes} from './lib/router'

const navigation = [
  {
    id: "homepage",
    icon: <HomeIcon/>,
    to: routes.HOMEPAGE
  },
  {
    id: "trips",
    icon: <TripIcon/>,
    to: routes.TRIPS
  },
  {
    id: "profile",
    icon: <ProfileIcon/>,
    to: routes.PROFILE
  },
  {
    id: "preset",
    icon: <PresetIcon/>,
    to: routes.PRESET
  }
]

export default function Navigation({location: {pathname}}) {
  if (pathname === routes.ROOT) return null // Don't show Navigation on landing page
  const [t] = useTranslation("common")

  return (
    <BottomNavigation
    style={{position: "fixed", bottom: 0, width: "100vw"}}
    value={pathname.substr(1)}
    >
      {navigation.map(({id, icon, to}) =>
        <BottomNavigationAction
          showLabel
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