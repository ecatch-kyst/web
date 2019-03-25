import React, {Component} from 'react'
import {withRouter, Redirect} from "react-router-dom"
import {Grid, Button, TextField} from '@material-ui/core'
import {AUTH} from '../lib/firebase'
import Store from '../db/Store'

import {withPage} from './shared'
import {withTranslation} from 'react-i18next'
import {routes} from '../lib/router'

export class Register extends Component {

  static contextType = Store

  state = {
    name: "",
    email: "",
    password: "",
    isSubmitted: false
  }

  handleChange = ({target: {name, value}}) => this.setState({[name]: value})


  handleSubmitRegistration = async e => {
    e.preventDefault()
    const {email, password, name} = this.state
    try {
      await AUTH.createUserWithEmailAndPassword(email, password)
      await this.context.handleUserUpdateProfile({displayName: name})
      this.setState({isSubmitted: true})
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const {name, email, password, isSubmitted} = this.state
    const {t} = this.props
    return (
      <form onSubmit={this.handleSubmitRegistration}>
        {isSubmitted ? <Redirect to={routes.DASHBOARD}/> : null}
        <Grid container direction="column" spacing={16} style={{margin: 16}}>
          <Grid container item spacing={16}>
            <Input
              label={t("labels.email")}
              name="email"
              onChange={this.handleChange}
              placeholder={t("placeholders.email")}
              value={email}
            />
            <Input
              label={t("labels.password")}
              name="password"
              onChange={this.handleChange}
              placeholder={t("placeholders.password")}
              value={password}
            />
          </Grid>
          <Input
            label={t("labels.name")}
            name="name"
            onChange={this.handleChange}
            placeholder={t("placeholders.name")}
            value={name}
          />
          <Grid container item>
            <Button
              color="secondary"
              onClick={this.handleSubmitRegistration}
              size="large"
              type="submit"
              variant="contained"
            >
              {t("buttons.submit")}
            </Button>
          </Grid>
        </Grid>
      </form>
    )
  }
}

export default withRouter(withPage(
  withTranslation("register")(Register),
  {
    namespace: "register",
    isProtected: false
  }
))

export const Input = ({type, ...props}) =>
  <Grid item>
    <TextField
      {...props}
      type={type || props.name}
      variant="outlined"
    />
  </Grid>