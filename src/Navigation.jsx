import React from 'react'
import {Link} from "react-router-dom"
import {BottomNavigation, BottomNavigationAction} from '@material-ui/core'
import {HomeIcon, PresetIcon, ProfileIcon, TripIcon} from "./icons"
import {useTranslation} from 'react-i18next'
import {routes} from './lib/router'


// Navigation buttons should be added here
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


export const Navigation = ({location: {pathname}}) => {
  if (pathname === routes.ROOT) return null // Don't show Navigation on login page
  const [t] = useTranslation("common")

  return (
    <BottomNavigation
      className="bottom-navigation"
      value={pathname.split("/")[1]}
    >
      {navigation.map(({id, icon, to}) =>
        <BottomNavigationAction
          component={Link}
          icon={icon}
          key={id}
          label={t(`navigation.${id}`)}
          showLabel
          to={to}
          value={id}
        />
      )}
    </BottomNavigation>
  )
}

export default Navigation