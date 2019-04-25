import React from 'react'
import {Loading, TableHead, Page, SwitchView} from '../shared'

import {Table, TableBody, Grid, Typography} from '@material-ui/core'

import Trip, {TripRow} from './Trip'
import {useStore, useListMutations} from '../../hooks'
import {useTranslation} from 'react-i18next'

export {Trip}

export default () => {
  const {trips} = useStore()
  const [t] = useTranslation("trips")

  const {
    list: mutatedTrips, order, orderBy, handleRequestSort
  } = useListMutations(trips, {order: "desc", orderBy: "start"})


  const activeTripIndex = mutatedTrips.findIndex(t => !t.isFinished)
  let activeTrip
  if (activeTripIndex !== -1) {
    activeTrip = mutatedTrips[activeTripIndex]
    mutatedTrips.splice(activeTripIndex, 1)
  }

  return (
    <Page
      namespace="trips"
      title={() =>
        <Grid alignItems="center" container justify="space-between" style={{padding: 16}}>
          <Typography variant="h4">{t("titles.main")}</Typography>
          <SwitchView/>
        </Grid>
      }
    >
      {trips.length ?
        <Table>
          <TableHead
            namespace="trips"
            onRequestSort={handleRequestSort}
            order={order}
            orderBy={orderBy}
          />
          <TableBody>
            {activeTrip ? <TripRow {...activeTrip}/> : null}
            {mutatedTrips.map(trip => <TripRow key={trip.id} {...trip}/>)}
          </TableBody>
        </Table> :
        <Loading/>
      }
    </Page>
  )
}
