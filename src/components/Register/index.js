import React, {Component} from 'react'
import {Grid, Button, TextField} from '@material-ui/core'
import {AUTH} from '../../lib/firebase'
import {withNamespaces} from 'react-i18next'
import Store from '../../db/Store'

import {Redirect} from "react-router-dom"
import {routes} from '../../lib/router'

class Register extends Component {

  static contextType = Store

  state = {
    name: "",
    email: "",
    password: ""
  }

  handleChange = ({target: {name, value}}) => this.setState({[name]: value})


  handleSubmitRegistration = async () => {
    const {email, password} = this.state
    try {
      await AUTH.createUserWithEmailAndPassword(email, password)
      await this.context.handleUserUpdateProfile({displayName: this.state.name})

    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const {name, email, password} = this.state
    const {t} = this.props
    const {user} = this.context

    return (
      <>
        {Object.keys(user).length ? <Redirect to={routes.PROFILE}/> : null}
        <form onSubmit={this.handleSubmitRegistration}>
          <Grid container direction="column" spacing={16} style={{margin: 16}}>
            <Grid container item spacing={16}>
              <Input
                label={t("register.labels.email")}
                name="email"
                onChange={this.handleChange}
                placeholder={t("register.placeholders.email")}
                value={email}
              />
              <Input
                label={t("register.labels.password")}
                name="password"
                onChange={this.handleChange}
                placeholder={t("register.placeholders.password")}
                value={password}
              />
            </Grid>
            <Input
              label={t("register.labels.name")}
              name="name"
              onChange={this.handleChange}
              placeholder={t("register.placeholders.name")}
              value={name}
            />
            <Grid container item>
              <Button
                color="secondary"
                onClick={this.handleSubmitRegistration}
                size="large"
                variant="contained"
              >
                {t("register.buttons.submit")}
              </Button>
            </Grid>
          </Grid>
        </form>
      </>
    )
  }
}

export default withNamespaces("pages")(Register)

const Input = ({type, ...props}) =>
  <Grid item>
    <TextField
      {...props}
      type={type || props.name}
      variant="outlined"
    />
  </Grid>