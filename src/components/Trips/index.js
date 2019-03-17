import React, {Component} from 'react'
import {Loading, withPage, TableHead} from '../shared'
import {withStore} from '../../db'

import {Table, TableBody} from '@material-ui/core'

import Trip, {TripRow} from './Trip'

export {Trip}

export class Trips extends Component {

    state = {
      order: 'desc',
      orderBy: 'created'
    }

    handleRequestSort = orderBy =>
      this.setState(({order}) => ({
        order: order === "desc" ? "asc" : "desc",
        orderBy
      }))


    render() {
      const {order, orderBy} = this.state
      const {trips} = this.props.store

      return (
        <>
        {trips.length ?
          <Table>
            <TableHead
              namespace="trips"
              onRequestSort={this.handleRequestSort}
              order={order}
              orderBy={orderBy}
            />
            <TableBody>
              {trips.map(trip => <TripRow id={trip.id} key={trip.id}/>)}
            </TableBody>
          </Table> :
          <Loading/>
        }
        </>
      )
    }
}


export default withPage(withStore(Trips), {namespace: "trips"})