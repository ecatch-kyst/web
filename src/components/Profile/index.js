import React from 'react'
import {withNamespaces} from 'react-i18next'
import {List, ListItem, Button} from '@material-ui/core'
import {withStore} from '../../db'
import {routes} from '../../lib/router'
import {Redirect} from "react-router-dom"


const Profile = ({t, store: {handleUserLogout, user: {displayName, email}}}) =>
  <>
    <List>
      <ListItem> {t("profile.labels.name")}: {displayName}</ListItem>
      <ListItem> {t("profile.labels.email")}: {email}</ListItem>
    </List>
    <Button
      color="secondary"
      onClick={handleUserLogout}
      size="large"
      variant="contained"
    >
      {t("profile.buttons.logout")}
    </Button>
    {!displayName && <Redirect to={routes.ROOT}/>}
  </>

export default withNamespaces("pages")(withStore(Profile))