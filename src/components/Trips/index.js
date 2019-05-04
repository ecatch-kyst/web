import React, {useContext} from 'react'
import {Loading, TableHead, Page, SwitchView} from '../shared'

import {Table, TableBody, Grid, Typography} from '@material-ui/core'

import Trip, {TripRow} from './Trip'
import {useListMutations} from '../../hooks'
import {useTranslation} from 'react-i18next'
import Store from '../../db'

export {Trip}

export default () => {
  const {trips} = useContext(Store)
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
      <div style={{maxWidth: "100vw", overflowX: "scroll"}}>
        {trips.length ?
          <Table >
            <TableHead
              namespace="trips"
              onRequestSort={handleRequestSort}
              order={order}
              orderBy={orderBy}
            />
            <TableBody >
              {activeTrip ? <TripRow {...activeTrip}/> : null}
              {mutatedTrips.map(trip => <TripRow key={trip.id} {...trip}/>)}
            </TableBody>
          </Table> :
          <Loading/>
        }
      </div>
    </Page>
  )
}
