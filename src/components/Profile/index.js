import React from 'react'
import {
  List, ListItem, Grid, FormControlLabel,
  Switch, Typography, withTheme, Button, Divider
} from '@material-ui/core'
import {withTranslation} from 'react-i18next'
import LanguageChooser from './LanguageChooser'
import ProfileDetails from './ProfileDetails'
import {withStore} from '../../db'
import {Page, DestructButton} from '../shared'

export const Profile = ({t, store: {isDarkMode, handleToggleDarkMode, handleUserDelete, handleDialog}}) => {

  const handleDeleteUser = () => handleDialog({type: "deleteUser", submit: handleUserDelete, isDestructive: true})

  return (

    <Page namespace="profile" style={{marginBottom: 64}}>
      <ProfileDetails/>
      <Divider/>
      <List>
        <Element
          actionComponent={
            <FormControlLabel
              control={
                <Switch
                  checked={isDarkMode}
                  color="primary"
                />
              }
            />
          }
          clickable
          id="dark-mode"
          onClick={handleToggleDarkMode}
        />
        <Element
          actionComponent={<LanguageChooser/>}
          id="changeLanguage"
        />
        <Divider/>
        <Element
          actionComponent={
            <DestructButton onClick={handleDeleteUser}>
              {t("buttons.deleteUser")}
            </DestructButton>
          }
          id="deleteUser"
        />
        <Element
          actionComponent={
            <Logout/>
          }
          id="logout"
        />
        <Element
          actionComponent={
            <Typography align="center">
              {process.env.REACT_APP_VERSION}
            </Typography>
          }
          id="version"
        />
      </List>
    </Page>
  )
}

export default withTranslation("profile")(withStore(withTheme()(Profile)))


export const Element = withTranslation("profile")(
  ({t, id, actionComponent, onClick, clickable}) =>
    <ListItem>
      <Grid alignItems="center" container>
        <Grid item xs={7}>
          <Typography variant="h6">{t(`titles.${id}`)}</Typography>
          <Typography variant="subtitle2">{t(`descriptions.${id}`)}</Typography>
        </Grid>
        <Grid container item justify="flex-end" onClick={() => clickable && onClick()} style={{cursor: clickable ? "pointer" : ""}} xs={5}>
          {actionComponent}
        </Grid>
      </Grid>
    </ListItem>
)

export const Logout = withTranslation("profile")(withStore(({t, store: {handleUserLogout}}) =>
  <Button
    color="secondary"
    name="logout"
    onClick={handleUserLogout}
    size="large"
    variant="contained"
  >
    {t("buttons.logout")}
  </Button>
))