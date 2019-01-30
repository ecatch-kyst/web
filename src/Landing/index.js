import React from 'react'
import {Link} from "react-router-dom"
import Centered from '../components/Centered'
import {Typography, Card, Button, CardActions, CardContent, TextField, Grid, Link as MuiLink} from '@material-ui/core'
import {useDimensions} from '../hooks'
import {routes} from '../lib/router'
import "./landing.sass"
import blob from "../assets/blob.svg"
import {withNamespaces} from 'react-i18next'

const Landing = ({t}) => {
  const dimensions = useDimensions()
  return (
    <Centered>
      <img alt={t("landing.blob-img-alt")} className="landing-blob landing-blob-1" src={blob}/>
      <img alt={t("landing.blob-img-alt")} className="landing-blob landing-blob-2" src={blob}/>
      <Typography variant="h4">{process.env.REACT_APP_TITLE}</Typography>
      <Card style={{minWidth: dimensions.width/3, maxWidth: dimensions.width - 32, margin: 16}}>
        <CardContent>
          <Grid container justify="center" spacing={8}>
            <Grid item>
              <TextField label={t("landing.email")} variant="outlined"/>
            </Grid>
            <Grid item>
              <TextField label={t("landing.password")} variant="outlined"/>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid alignItems="center" container justify="space-around">
            <Grid item>
              <Button
                color="primary"
                component={Link}
                size="large"
                to={routes.TEST}
                variant="contained"
              >
                {t("landing.login")}
              </Button>
            </Grid>
            <Grid item>
              <MuiLink
                component={Link}
                to={routes.FORGOT_PASSWORD}
              >{t("landing.forgot-password")}
              </MuiLink>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
      <Typography variant="caption">{process.env.REACT_APP_VERSION}</Typography>
    </Centered>
  )
}
export default withNamespaces("pages")(Landing)