import React from 'react'
import {List, ListItem, Grid, FormControlLabel, Switch, Typography} from '@material-ui/core'
import {withTranslation} from 'react-i18next'
import {withStore} from '../../db'
import LanguageChooser from './LanguageChooser'


const Settings = ({t, store: {isDarkMode, handleToggleDarkMode}}) =>

  <Grid container direction="column">
    <Typography style={{padding: 16}} variant="h4">{t("titles.settings")}</Typography>
    <List>
      <Element
        actionComponent={
          <FormControlLabel
            control={
              <Switch
                checked={isDarkMode}
                color="primary"
                onChange={handleToggleDarkMode}
              />
            }
          />
        }
        id="dark-mode"
        onClick={handleToggleDarkMode}
      />
      <Element
        actionComponent={<LanguageChooser/>}
        clickable={false}
        id="changeLanguage"
      />
    </List>
  </Grid>

export default withStore(withTranslation("settings")(Settings))


const Element = withTranslation("settings")(
  ({t, id, actionComponent, onClick, clickable=true}) =>
    <ListItem onClick={() => clickable && onClick()} style={{cursor: clickable ? "pointer" : ""}}>
      <Grid alignItems="center" container>
        <Grid item xs={8}>
          <Typography variant="h6">{t(`titles.${id}`)}</Typography>
          <Typography variant="subtitle2">{t(`descriptions.${id}`)}</Typography>
        </Grid>
        <Grid container item justify="flex-end" xs={4}>
          {actionComponent}
        </Grid>
      </Grid>
    </ListItem>
)