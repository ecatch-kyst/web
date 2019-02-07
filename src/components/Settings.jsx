import React from 'react'
import {List, ListItem, Grid, FormControlLabel, Switch, Typography} from '@material-ui/core'
import {withNamespaces} from 'react-i18next'
import {withStore} from '../db'


const Settings = ({store: {isDarkMode, handleToggleDarkMode}}) => {
  return (
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
    </List>
  )
}

export default withStore(Settings)


const Element = withNamespaces("settings")(
  ({t, id, actionComponent, onClick}) =>
    <ListItem onClick={onClick} style={{cursor: "pointer"}}>
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