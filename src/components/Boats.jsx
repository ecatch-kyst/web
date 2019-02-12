import React from 'react'
import {withPage} from './shared/Page'
import {List, ListItem, Typography, Grid, Divider} from '@material-ui/core'
import {withStore} from '../db'
import {withTranslation} from 'react-i18next'
import Loading from './shared/Loading'


export const Boats = ({store: {boats}}) =>
  <List>
    {boats.length ?
      boats.map(boat => <Boat key={boat.id} {...boat}/>) :
      <Loading/>
    }
  </List>

export const Boat = withTranslation("boats")(({t, id, callSignal, length}) =>
  <>
    <ListItem key={id}>
      <Grid container spacing={16}>
        <Grid container item>
          <Typography variant="h5">{callSignal || id}</Typography>
        </Grid>
        <Grid container item justify="space-between">
          <Typography>{t("titles.length")}</Typography>
          <Typography>{length}m</Typography>
        </Grid>
      </Grid>
    </ListItem>
    <Divider/>
  </>
)

export default withStore(withPage(Boats, {namespace: "boats"}))