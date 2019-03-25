import React from 'react'
import {withRouter} from "react-router-dom"
import {format} from 'date-fns'

import {Divider, Grid, Typography, Card, CardHeader} from '@material-ui/core'

import {Loading, Page, Status} from '../../shared'
import Centered from '../../Centered'

import Forms from "../../Forms"
import TripRow from "./TripRow"
import DCAOverview from "./DCAOverview"
import {useStore} from '../../../hooks'
import {useTranslation} from 'react-i18next'
export {TripRow}

export const Trip = ({match: {params: {tripId}}}) => {
  const {trips} = useStore()
  const [t] = useTranslation("trips")
  const [dropdownT] = useTranslation("forms")

  const {POR, DEP, DCAList, start, end, isFinished} = trips.find(trip => trip.id === tripId) || {}

  let title = t("titles.enRoute")
  const subtitle = `${start ? format(start, "MMMM dd - H:mm") : ""} / ${isFinished ? format(end, "MMMM dd - H:mm") : "..."}`

  if (isFinished) {
    const departureLabel = dropdownT("dropdowns.ports", {returnObjects: true}).find(p => p.value === DEP.PO).label
    const arrivalLabel = dropdownT("dropdowns.ports", {returnObjects: true}).find(p => p.value === POR.PO).label
    title = `${departureLabel} → ${arrivalLabel}`
  }

  return (
    <Page
      subtitle={subtitle}
      title={
        <Grid alignItems="center" container justify="space-between">
          <Grid component={Typography} item variant="h4">{title}</Grid>
          <Grid item>
            {isFinished ? null : <Forms direction="row" justify="flex-start"/>}
          </Grid>
        </Grid>
      }
    > {
        start ?
          <TripOverview
            DCAList={DCAList}
            DEP={DEP}
            POR={POR}
          /> :
          <Centered>
            <Loading/>
          </Centered>
      }
    </Page>
  )
}


export default withRouter(Trip)


export const TripOverview = ({DEP, POR, DCAList}) =>
  <>
    <Divider/>
    <Grid container item style={{padding: 16}}>
      <Grid item>
        <Card><CardHeader title={<Typography variant="h6">DEP <Status result={DEP.result}/></Typography>}/> </Card>
      </Grid>
      {POR ?
        <Grid item>
          <Card><CardHeader title={<Typography variant="h6">POR <Status result={POR.result}/></Typography>}/>
          </Card>
        </Grid> :
        null
      }
    </Grid>
    <Divider/>
    <Grid item>
      <Typography style={{padding: 16}} variant="h5">Trip Overview</Typography>
      <DCAOverview list={DCAList}/>
    </Grid>
  </>