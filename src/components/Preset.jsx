import React, {} from 'react'
import {Page, Loading} from './shared'
import {AddActivity, AddSpecie, AddZO, AddFishingPermit, AddPort, AddTool} from './Forms'
import {
  Grid, withTheme
} from '@material-ui/core'

export const Preset = () => {

  return (
    <Page namespace="preset" style={{marginBottom: 64}}>
      <Grid>
        <AddActivity/>
        <AddSpecie/>
        <AddZO/>
        <AddFishingPermit/>
        <AddPort/>
        <AddTool/>
      </Grid> :
      <Loading/>
    </Page>
  )

}

export default withTheme()(Preset)
