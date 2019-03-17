import React from 'react'
import {withRouter} from "react-router-dom"
import {format} from 'date-fns'
import {Tooltip, TableRow, TableCell, Typography} from '@material-ui/core'

import {withStore} from '../../../db'
import {colors} from '../../../lib/material-ui'
import {routes} from '../../../lib/router'


export default withStore(withRouter(({id, store: {trips}, history}) => {
  const {POR, DEP, start, end, isFinished} = trips.find(trip => trip.id === id)
  return (
    <Tooltip title={isFinished ? "": "Ongoing trip"}>
      <TableRow hover onClick={() => history.push(`${routes.TRIPS}/${id}`)}
        style={{
          backgroundColor: isFinished ? "" : colors.green
        }}
      >
        <TableCell>
          <Typography>{isFinished ? `${DEP.PO} → ${POR.PO}` : "En route"}</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography>
            {format(start, "M.d/H:mm")} → {isFinished ? format(end, "M.d/H:mm") : "..."}
          </Typography>
        </TableCell>
      </TableRow>
    </Tooltip>
  )
}))
