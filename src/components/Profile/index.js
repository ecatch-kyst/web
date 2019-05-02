import React, {useContext} from 'react'
import {
  List, ListItem, Grid, FormControlLabel,
  Switch, Typography, withTheme, Button, Divider
} from '@material-ui/core'
import {useTranslation} from 'react-i18next'
import LanguageChooser from './LanguageChooser'
import ProfileDetails from './ProfileDetails'
import {Page} from '../shared'
import Store from '../../db'

export const Profile = () => {
  const {isDarkMode, handleToggleDarkMode} = useContext(Store)

  return (

    <Page namespace="profile">
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
            <Logout/>
          }
          id="logout"
        />
        <Element id="about-us"/>
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

export default withTheme()(Profile)


export const Element = ({id, actionComponent, onClick, clickable}) => {
  const [t] = useTranslation("profile")
  return (
    <ListItem onClick={() => clickable && onClick()} style={{cursor: clickable ? "pointer" : ""}}>
      <Grid alignItems="center" container>
        <Grid item xs={7}>
          <Typography variant="h6">{t(`titles.${id}`)}</Typography>
          <Typography variant="subtitle2">{t(`descriptions.${id}`)}</Typography>
        </Grid>
        <Grid container item justify="flex-end" xs={5}>
          {actionComponent}
        </Grid>
      </Grid>
    </ListItem>

  )
}


/*
 * TODO: Unsubscribe from data listeners when logging out,
 * in Store Context
 * @see https://firebase.google.com/docs/firestore/query-data/listen#detach_a_listener
 * @see https://firebase.google.com/docs/database/web/read-and-write#detach_listeners
 */
export const Logout = () => {
  const [t] = useTranslation("profile")
  const {handleUserLogout} = useContext(Store)
  return (
    <Button
      color="secondary"
      name="logout"
      onClick={handleUserLogout}
      variant="contained"
    >
      {t("buttons.logout")}
    </Button>
  )
}