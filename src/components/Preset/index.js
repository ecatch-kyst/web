import React from 'react'
import {withPage} from '../shared'
import AddFavorite from "./components/AddFavorite"
import {useStore} from '../../hooks'


export const Preset = () => {
  const {custom: {activity, species, ZO, fishingPermit, ports, fishinggear}} = useStore()
  const favorites = [
    {
      type: "activity",
      list: activity || [],
      numberOfChoices: 3
    },
    {
      type: "species",
      list: species || [],
      numberOfChoices: 2
    },
    {
      type: "ZO",
      list: ZO || [],
      numberOfChoices: 2
    },
    {
      type: "fishingPermit",
      list: fishingPermit || [],
      numberOfChoices: 2
    },
    {
      type: "ports",
      list: ports || [],
      numberOfChoices: 2
    },
    {
      type: "fishinggear",
      list: fishinggear || [],
      numberOfChoices: 2
    }
  ]

  return favorites.map(favorite => <AddFavorite key={favorite.type} {...favorite}/>)

}

export default withPage(Preset, {namespace: "preset"})
