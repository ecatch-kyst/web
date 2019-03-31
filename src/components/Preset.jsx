import React, {} from 'react'
import {Page} from './shared'
import {AddActivity, AddSpecie, AddZO, AddFishingPermit, AddPort, AddTool} from './Forms'
import {
  List, ListItem, Grid, FormControlLabel,
  Switch, Typography, withTheme, Button, Divider
} from '@material-ui/core'

export const Preset = () => {

  return (
    <Page namespace="preset" style={{marginBottom: 64}}>
      <AddActivity/>
      <AddSpecie/>
      <AddZO/>
      <AddFishingPermit/>
      <AddPort/>
      <AddTool/>
    </Page>
  )

}

export default withTheme()(Preset)
