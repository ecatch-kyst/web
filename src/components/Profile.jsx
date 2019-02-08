import React from 'react'
import {withTranslation} from 'react-i18next'
import {List, ListItem, Button, Typography} from '@material-ui/core'
import {withStore} from '../db'
import {routes} from '../lib/router'
import {Redirect} from "react-router-dom"


const Profile = ({t, store: {handleUserLogout, handleUserDelete, user: {displayName, email}}}) =>
  <>
    <List>
      <ListItem><Typography>{t("labels.name")}: {displayName}</Typography></ListItem> {/*The only way i found to change the color of the listItem was to */}
      <ListItem><Typography>{t("labels.email")}: {email}</Typography>  </ListItem>    {/*make a typography tag within. Could also just make a class?*/}
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

export default withTranslation("profile")(withStore(Profile))