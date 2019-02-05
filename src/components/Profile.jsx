import React from 'react'
import {withNamespaces} from 'react-i18next'
import {List, ListItem, Button} from '@material-ui/core'
import {withStore} from '../db'
import {routes} from '../lib/router'
import {Redirect} from "react-router-dom"


const Profile = ({t, store: {handleUserLogout, handleUserDelete, user: {displayName, email}}}) =>
  <>
    <List>
      <ListItem> {t("labels.name")}: {displayName}</ListItem>
      <ListItem> {t("labels.email")}: {email}</ListItem>
    </List>
    <Button
      color="secondary"
      onClick={handleUserLogout}
      size="large"
      variant="contained"
    >
      {t("buttons.logout")}
    </Button>

    <Button
      onClick={handleUserDelete}
      size="large"
      variant="contained"
    >
      {t("buttons.deleteUser")}
    </Button>
    {!displayName && <Redirect to={routes.ROOT}/>}
  </>

export default withNamespaces("profile")(withStore(Profile))