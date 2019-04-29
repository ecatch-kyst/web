import React from 'react'
import {Button, withStyles} from '@material-ui/core'
import {colors} from '../../lib/material-ui'

const DestructButton = withStyles({
  root: {backgroundColor: colors.red}
})(({children, classes, ...props}) =>
  <Button
    color="primary"
    variant="contained"
    {...props}
    className={classes.root}
  >
    {children}
  </Button>
)

export default DestructButton