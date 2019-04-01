import React from 'react'
import {withPage} from '../shared'
//import {AddActivity, AddSpecie, AddZO, AddFishingPermit, AddPort, AddTool} from '../Forms'
import AddType from "./components/AddFavoriteType"

const mapping = [
  {
    type: "activity",
    list: {custom: {activites}} = useStore(),
    numberOfChoices: 3
  },
  {
    type: "species",
    list: {custom: {species}} = useStore(),
    numberOfChoices: 2
  }
]

export const Preset = () => {

  return (
    <div>
      {mapping.map(({type, list, numberOfChoices}) => <AddType {}/>)}
    </div>
  )

}

export default withPage(Preset, {namespace: "preset"})
