import React, {Component} from 'react'
import {Link, Redirect} from "react-router-dom"
import Centered from '../components/Centered'
import {Typography, Card, Button, CardActions, CardContent, TextField, Grid, Link as MuiLink} from '@material-ui/core'
import {routes} from '../lib/router'
import "./landing.sass"
import blob from "../assets/blob.svg"
import {withTranslation} from 'react-i18next'
import Store from '../db'


class Landing extends Component {

  static contextType = Store

  state = {
    email: "",
    password: ""
  }

  handleChange = ({target: {name, value}}) => this.setState({[name]: value})

  handleUserLogin = () => {
    const {email, password} = this.state
    this.context.handleUserLogin(email, password)
  }

  render() {
    const {t} = this.props
    const {user} = this.context

    return (
      <Centered>
        {Object.keys(user).length ? <Redirect to={routes.DASHBOARD} /> : null}
        <img alt={t("landing.blob-img-alt")} className="landing-blob landing-blob-1" src={blob}/>
        <img alt={t("landing.blob-img-alt")} className="landing-blob landing-blob-2" src={blob}/>
        <Typography variant="h4">{process.env.REACT_APP_TITLE}</Typography>
        <Card style={{minWidth: "calc(100vw/3)", maxWidth: "calc(100vw - 32px)", margin: 16}}>
          <CardContent>
            <Grid container justify="center" spacing={8}>
              <Grid item>
                <TextField
                  label={t("landing.email")}
                  name="email"
                  onChange={this.handleChange}
                  type="email"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  label={t("landing.password")}
                  name="password"
                  onChange={this.handleChange}
                  type="password"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid alignItems="center" container justify="space-around">
              <Grid item>
                <Button
                  color="primary"
                  onClick={this.handleUserLogin}
                  size="large"
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
}
export default withTranslation("pages")(Landing)