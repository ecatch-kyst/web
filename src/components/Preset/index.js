import React from 'react'
import {withPage} from '../shared'
import {AddActivity, AddSpecie, AddZO, AddFishingPermit, AddPort, AddTool} from '../Forms'
import {Grid} from '@material-ui/core'
//import AddActivity from "./components/AddFavoriteType"

export const Preset = () => {

  return (
    <Grid>
      <AddTool/>
      <AddActivity/>
      <AddSpecie/>
      <AddZO/>
      <AddFishingPermit/>
      <AddPort/>
    </Grid>
  )

}

export default withPage(Preset, {namespace: "preset"})
