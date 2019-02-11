import React from 'react'
import {Button, withStyles} from '@material-ui/core'

const DestructButton = withStyles({
  root: {backgroundColor: "#A8112B"}
})(({children, classes, ...props}) =>
  <Button
    color="primary"
    size="large"
    variant="contained"
    {...props}
    className={classes.root}
  >
    {children}
  </Button>
)

export default DestructButton