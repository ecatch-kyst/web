import React, {memo} from 'react'
import {Link} from "react-router-dom"
import { routes } from '../../lib/router';
import { useTranslation } from 'react-i18next';
import { Grid, Button } from '@material-ui/core';


export const FormButton = ({type, show, DCAStarted}) => {
  const [t] = useTranslation("forms")
  const label = t(`links.${type === "DCA0" && DCAStarted ? "DCA0Edit" : type}`)
  return(
    show ?
      <Grid item>
        <Button
          color="primary"
          component={Link}
          size="large"
          to={`${routes.MESSAGES}${routes[type]}${routes.NEW}`}
          variant="contained"
        >
          {label}
        </Button>
      </Grid> : null
  )
}

export default memo(FormButton)

FormButton.defaultProps = {
  show: true
}