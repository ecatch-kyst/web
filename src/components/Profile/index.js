import React from 'react'
import {
  List, ListItem, Grid, FormControlLabel,
  Switch, Typography, withTheme, Button, Divider
} from '@material-ui/core'
import {useTranslation} from 'react-i18next'
import LanguageChooser from './LanguageChooser'
import ProfileDetails from './ProfileDetails'
import {Page} from '../shared'
import {useStore} from '../../hooks'

export const Profile = () => {

  const {isDarkMode, handleToggleDarkMode} = useStore()

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

export default withTheme()(Profile)


export const Element = ({id, actionComponent, onClick, clickable}) => {
  const [t] = useTranslation("profile")
  return (
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
}

export const Logout = () => {
  const [t] = useTranslation("profile")
  const {handleUserLogout} = useStore()
  return (
    <Button
      color="secondary"
      name="logout"
      onClick={handleUserLogout}
      size="large"
      variant="contained"
    >
      {t("buttons.logout")}
    </Button>
  )
}