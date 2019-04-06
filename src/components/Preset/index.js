import React from 'react'
import {withPage} from '../shared'
import AddFavorite from "./components/AddFavorite"

// type is the type of dropdown, list is the list of choices you have the option to choice among to set the favorites, numberOfChoices is how many favorites per type you allow to user to set
export const favorites = [
  {
    type: "activity",
    numberOfChoices: 3
  },
  {
    type: "species",
    numberOfChoices: 2
  },
  {
    type: "ZO",
    numberOfChoices: 2
  },
  {
    type: "fishingPermit",
    numberOfChoices: 2
  },
  {
    type: "ports",
    numberOfChoices: 2
  },
  {
    type: "fishingGear",
    numberOfChoices: 2
  }
]

// Will map over the list favorites and make a select for every object
export const Preset = () =>
  favorites.map(favorite => <AddFavorite key={favorite.type} {...favorite}/>)


export default withPage(Preset, {namespace: "preset"})