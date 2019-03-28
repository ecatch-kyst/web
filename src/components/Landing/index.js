import React, {Component} from 'react'
import {Link, Redirect} from "react-router-dom"
import Centered from '../Centered'
import {Typography, Card, Button, CardActions, CardContent, TextField, Grid, Link as MuiLink} from '@material-ui/core'
import {routes} from '../../lib/router'
import "./landing.sass"
import blob from "../../assets/blob.svg"
import {withTranslation} from 'react-i18next'
import Store from '../../db'
import {AUTH} from '../../lib/firebase'
import logo from '../../assets/eCatch_pilot_h.png'


class Landing extends Component {

  static contextType = Store

  state = {
    email: "",
    password: ""
  }

  handleChange = ({target: {name, value}}) => this.setState({[name]: value})

  handleSubmit = e => {
    e.preventDefault && e.preventDefault()
    this.handleUserLogin()
  }

  handleUserLogin = () => {
    const {email, password} = this.state
    this.context.handleUserLogin({email, password})
  }

  render() {
    const {t} = this.props

    return (
      <form onSubmit={this.handleSubmit}>
        <Centered>
          {AUTH.currentUser ? <Redirect to={routes.HOMEPAGE} /> : null}
          <img alt={t("landing.blob-img-alt")} className="landing-blob landing-blob-1" src={blob}/>
          <img alt={t("landing.blob-img-alt")} className="landing-blob landing-blob-2" src={blob}/>
          <Typography style={{width:0, height:0, opacity:0}} variant="h1">{process.env.REACT_APP_TITLE}</Typography>
          <img alt={process.env.REACT_APP_TITLE} src={logo} />
          <Card style={{minWidth: "calc(100vw/3)", maxWidth: "calc(100vw - 32px)", margin: 16}}>
            <CardContent>
              <Grid container direction="column" justify="center" spacing={8}>
                <Grid item>
                  <TextField
                    autoFocus
                    fullWidth
                    label={t("landing.email")}
                    name="email"
                    onChange={this.handleChange}
                    type="email"
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
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
              <Grid alignItems="center" container justify="flex-end" spacing={16}>
                <Grid alignItems="center" container item justify="space-evenly" spacing={8}>
                  <Grid item>
                    <Button
                      color="secondary"
                      onClick={this.handleUserLogin}
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      {t("landing.login")}
                    </Button>
                  </Grid>
                  <Grid item>
                    <MuiLink
                      component={Link}
                      style={{marginRight: 16}}
                      to={routes.FORGOT_PASSWORD}
                    >{t("landing.forgot-password")}
                    </MuiLink>
                  </Grid>
                  <Grid item>
                    <Button
                      color="primary"
                      component={Link}
                      size="large"
                      to={routes.REGISTER}
                    >
                      {t("landing.register")}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Centered>
      </form>
    )
  }
}

export default withTranslation("pages")(Landing)