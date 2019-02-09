import React from 'react'
import {Redirect} from "react-router-dom"
import {List, ListItem, Grid, FormControlLabel, Switch, Typography, withTheme, Button, Divider} from '@material-ui/core'
import {withTranslation} from 'react-i18next'
import LanguageChooser from './LanguageChooser'
import ProfileDetails from './ProfileDetails'
import {routes} from '../../lib/router'
import {AUTH} from '../../lib/firebase'
import {withStore} from '../../db'
import ActionModal from './ActionModal';

const Profile = ({t, store: {isDarkMode, handleToggleDarkMode, handleUserLogout, handleUserDelete, handleActionModal}}) =>
  <Grid container direction="column" style={{marginBottom: 56}}>
    {!AUTH.currentUser && <Redirect to={routes.ROOT}/>}
    <Typography style={{padding: "24px 24px 16px"}} variant="h4">{t("titles.profile")}</Typography>
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
          /*<Button
            color="primary"
            onClick={handleActionModal}
            size="large"
            variant="contained"
          >
            {t("buttons.deleteUser")}
          </Button>*/
          <ActionModal/>
        }
        id="deleteUser"
      />
      <Element
        actionComponent={
          <Button
            color="secondary"
            onClick={handleUserLogout}
            size="large"
            variant="contained"
          >
            {t("buttons.logout")}
          </Button>
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
  </Grid>

export default withTranslation("profile")(withStore(withTheme()(Profile)))


const Element = withTranslation("profile")(
  ({t, id, actionComponent, onClick, clickable}) =>
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