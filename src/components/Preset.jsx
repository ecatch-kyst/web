import React from 'react'
import {Page} from './shared'
import {/**AddActivity, AddSpecie, AddZO, AddFishingPermit, AddPort, **/AddTool} from './Forms/components/AddFavoriteTool'
import {
  Grid, withTheme
} from '@material-ui/core'

export const Preset = () => {

  return (
    <Page namespace="preset" style={{marginBottom: 64}}>
      {
        <Grid>
          <AddTool/>
        </Grid>
      }
    </Page>
  )

}

export default Preset
