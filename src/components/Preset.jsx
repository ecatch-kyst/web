import React from 'react'
import {withPage} from './shared'
import {/**AddActivity, AddSpecie, AddZO, AddFishingPermit, AddPort, **/AddTool} from './Forms/components/AddFavoriteTool'
import {Grid} from '@material-ui/core'

export const Preset = () => {

  return (
    <Grid>
      <AddTool/>
    </Grid>
  )

}

export default withPage(Preset, {namespace: "preset"})
