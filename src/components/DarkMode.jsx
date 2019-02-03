import React from 'react'
import {withStore} from '../db'
import {Switch, FormControlLabel, Grid, Typography} from '@material-ui/core'
import {withNamespaces} from 'react-i18next'


const DarkMode = ({store: {handleToggleDarkMode, isDarkMode}, t}) =>
  <Grid alignItems="center" container justify="space-between">
    <Grid item>
      <Typography variant="subtitle1">{t("settings.description.dark-mode")}</Typography>
    </Grid>
    <Grid item>
      <FormControlLabel
        control={
          <Switch
            checked={isDarkMode}
            color="primary"
            onChange={handleToggleDarkMode}
          />
        }
        label={t("settings.labels.dark-mode")}
      />
    </Grid>
  </Grid>

export default withNamespaces("pages")(withStore(DarkMode))