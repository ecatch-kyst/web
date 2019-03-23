import React from 'react'
import {withRouter} from "react-router-dom"
import {format} from 'date-fns'
import {Tooltip, TableRow, TableCell, Typography, withTheme} from '@material-ui/core'

import {routes} from '../../../lib/router'
import {useStore} from '../../../hooks'
import {useTranslation} from 'react-i18next'


export default withTheme()(withRouter(({theme, id, history}) => {
  const {trips} = useStore()
  const [t] = useTranslation("trips")
  const {POR, DEP, start, end, isFinished} = trips.find(trip => trip.id === id)
  return (
    <Tooltip title={isFinished ? "": t("tooltips.enRoute")}>
      <TableRow hover onClick={() => history.push(`${routes.TRIPS}/${id}`)}
        style={{
          backgroundColor: isFinished ? "" : theme.palette.primary.main
        }}
      >
        <TableCell>
          <Typography
            style={{paddingTop: 16, color: isFinished ? "" : "#fff"}}
            variant={isFinished ? undefined : "h5"}
          >
            {isFinished ? `${DEP.PO} → ${POR.PO}` : t("titles.enRoute")}
          </Typography>
          {isFinished ? null :
            <Typography style={{color: "#fff", paddingBottom: 16}}>
              {DEP.PO} →
            </Typography>
          }
        </TableCell>
        <TableCell align="right">
          <Typography
            style={{color: isFinished ? "" : "#fff"}}
            variant={isFinished ? undefined : "h5"}
          >
            {format(start, "M.d/H:mm")} → {isFinished ? format(end, "M.d/H:mm") : ""}
          </Typography>
        </TableCell>
      </TableRow>
    </Tooltip>
  )
}))
