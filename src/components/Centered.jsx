import React from 'react'
import {Grid} from '@material-ui/core'
import {useDimensions} from '../hooks'


const Centered = ({children}) => {
  const {height} = useDimensions()

  return (
    <Grid
      alignItems="center"
      className="not-found"
      container
      direction="column"
      justify="center"
      style={{
        minHeight: height,
        maxHeight: height
      }}
    >
      {children}
    </Grid>
  )
}

export default Centered