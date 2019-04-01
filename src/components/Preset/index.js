import React from 'react'
import {withPage} from '../shared'
import AddFavorite from "./components/AddFavorite"
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

  return favorites.map(favorite => <AddFavorite key={favorite.type} {...favorite}/>)

}

export default withPage(Preset, {namespace: "preset"})
