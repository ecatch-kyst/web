import React from 'react'
import {Grid, Button} from '@material-ui/core'
import {routes} from '../lib/router'
import {withStore} from '../db'
import {Redirect, Link} from 'react-router-dom'
import {withTranslation} from 'react-i18next'


const Dashboard = ({t, store: {user}}) =>
  <Grid>
    {!Object.keys(user).length ? <Redirect to={routes.ROOT}/> : null}
      Dashboard
    <Button color="secondary" component={Link} to={routes.PROFILE} variant="contained">
      {t("dashboard.buttons.profile")}
    </Button>

    <Button color="secondary" component={Link} to={routes.SETTINGS} variant="contained">
      {t("dashboard.buttons.settings")}
    </Button>

  </Grid>

export default withTranslation("pages")(withStore(Dashboard))