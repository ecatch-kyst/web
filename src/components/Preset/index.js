import React from 'react'
import {withPage} from '../shared'
import AddFavorite from "./components/AddFavorite"
import {useStore} from '../../hooks'


export const Preset = () => {
  const {custom: {activity, species, ZO, fishingPermit, ports, fishingGear}} = useStore()
  // This list is used in the map function futher down. You will generate for every object in the list a grid with select for favorites.
  // type is the type of dropdown, list is the list of choices you have the option to choice among to set the favorites, numberOfChoices is how many favorites per type you allow to user to set
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
      type: "fishingGear",
      list: fishingGear || [],
      numberOfChoices: 2
    }
  ]

  // Will map over the list favorites and make a grid with grid with a select for every object
  return favorites.map(favorite => <AddFavorite key={favorite.type} {...favorite}/>)

}

export default withPage(Preset, {namespace: "preset"})
