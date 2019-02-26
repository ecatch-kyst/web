import React from 'react'
import {Link} from "react-router-dom"
import {routes} from "../../lib/router"
import {Centered} from '..'
import {withTranslation} from 'react-i18next'
import Form from './Form'
import {Button, Grid} from '@material-ui/core'
import forms from "./forms.json"

const Forms = ({t}) =>
  <Centered style={{minHeight: 0}}>
    <Grid alignItems="center" container direction="column" spacing={16} style={{padding: 16}}>
      {Object.keys(forms).map(id =>
        <Grid item key={id}>
          <Button
            color="primary"
            component={Link}
            size="large"
            to={`${routes.MESSAGES}${routes[id]}${routes.NEW}`}
            variant="contained"
          >
            {t(`links.${id}`)}
          </Button>
        </Grid>
      )}
    </Grid>
  </Centered>


export default withTranslation("forms")(Forms)

export {Form}