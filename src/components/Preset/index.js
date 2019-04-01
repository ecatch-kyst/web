import React from 'react'
import {withPage} from '../shared'
//import {AddActivity, AddSpecie, AddZO, AddFishingPermit, AddPort, AddTool} from '../Forms'
import AddType from "./components/AddFavoriteType"
import {useStore} from '../../hooks'


export const Preset = () => {
  const {custom: {activites, species}} = useStore()
  const favorites = [
    {
      type: "activity",
      list: activites || [],
      numberOfChoices: 3
    },
    {
      type: "species",
      list: species || [],
      numberOfChoices: 2
    }
  ]

  return favorites.map(favorite => <AddType key={favorite.type} {...favorite}/>)

}

export default withPage(Preset, {namespace: "preset"})
