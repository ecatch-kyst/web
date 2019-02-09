import React from 'react'
import {Grid, Typography} from '@material-ui/core'
import {routes} from '../lib/router'
import {Redirect} from 'react-router-dom'
import {withTranslation} from 'react-i18next'
import {AUTH} from '../lib/firebase'


const Dashboard = ({t}) =>
  <Grid container style={{padding: "24px 16px"}}>
    {!AUTH.currentUser ? <Redirect to={routes.ROOT}/> : null}
    <Typography variant ="h4">Dashboard</Typography>
  </Grid>

export default withTranslation("pages")(Dashboard)