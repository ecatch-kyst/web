import React from 'react'
import {withPage} from './shared'
import {Forms} from '.'
import { useStore } from '../hooks';
import { Grid, Typography, Paper } from '@material-ui/core';


export const HomePage = () => {
  const {position, DCAStarted} = useStore()

  return(
    <Grid>
      {DCAStarted ? <DCAStart/> : null}
      <Position {...position}/>
      <Forms/>
    </Grid>
  )
}

export default withPage(HomePage, {namespace: "homepage"})

const DCAStart = () => 
  <Paper>
    {/*TODO: Show DCA start related fields*/}
  </Paper>

export const Position = ({latitude="0", longitude="0"}) => <Typography>{latitude} {longitude}</Typography>
