import React from 'react'
import {withRouter} from "react-router-dom"
import {format} from 'date-fns'

import {Divider} from '@material-ui/core'


import {Loading, Page} from '../../shared'
import Centered from '../../Centered'

import Forms from "../../Forms"
import TripRow from "./TripRow"
import DCAListComponent from "./DCAList"
import {useStore} from '../../../hooks'
export {TripRow}

export const Trip = ({match: {params: {tripId}}}) => {
  const {trips} = useStore()
  const {POR, DEP, DCAList, start, end, isFinished} = trips.find(trip => trip.id === tripId) || {}
  const title = isFinished ? `${DEP.PO} → ${POR.PO}` : "En route"
  const subtitle = `${start ? format(start, "MMMM dd - H:mm") : ""} / ${isFinished ? format(end, "MMMM dd - H:mm") : "..."}`
  return (
    <Page
      subtitle={subtitle}
      title={title}
    > {
        start ?
        <>
          <Divider/>
          <DCAListComponent list={DCAList}/>
          {isFinished ? null : <Forms/>}
        </> :
          <Centered><Loading/></Centered>
      }
    </Page>
  )
}


export default withRouter(Trip)