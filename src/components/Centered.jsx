import React from 'react'
import {Grid} from '@material-ui/core'
import {useDimensions} from '../hooks'


const Centered = ({children, style, heightOffset=0, ...props}) => {
  const {height} = useDimensions()

  return (
    <Grid
      alignItems="center"
      className="not-found"
      container
      direction="column"
      justify="center"
      style={{
        minHeight: height+heightOffset,
        maxHeight: height+heightOffset,
        ...style
      }}
      {...props}
    >
      {children}
    </Grid>
  )
}

export default Centered