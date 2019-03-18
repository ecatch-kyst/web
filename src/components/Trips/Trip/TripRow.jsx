import React from 'react'
import {withRouter} from "react-router-dom"
import {format} from 'date-fns'
import {Tooltip, TableRow, TableCell, Typography} from '@material-ui/core'

import {colors} from '../../../lib/material-ui'
import {routes} from '../../../lib/router'
import {useStore} from '../../../hooks'


export default withRouter(({id, history}) => {
  const {trips} = useStore()
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
})
