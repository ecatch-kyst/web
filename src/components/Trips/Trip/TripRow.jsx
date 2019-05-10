import React, {memo} from 'react'
import {withRouter} from "react-router-dom"
import {format} from 'date-fns'
import {Tooltip, TableRow, TableCell, Typography, withTheme} from '@material-ui/core'

import {routes} from '../../../lib/router'
import {useTranslation} from 'react-i18next'


export const TripRow = memo(({theme, id, history, POR, DEP, start, end, isFinished}) => {

  const [t] = useTranslation("trips")
  const [dropdownT] = useTranslation("dropdowns")
  const ports = dropdownT("ports", {returnObjects: true})
  const departureLabel = ports.find(p => p.value === DEP.PO).label
  let arrivalLabel = ""
  if (isFinished) {
    arrivalLabel = ports.find(p => p.value === POR.PO).label
  }

  return (
    <Tooltip title={isFinished ? "": t("tooltips.enRoute")}>
      <TableRow hover onClick={() => history.push(`${routes.TRIPS}/${id}`)}
        style={{backgroundColor: isFinished ? "" : theme.palette.primary.main}}
      >
        {isFinished ?
          <TableCell padding="dense">
            <Typography>
              {departureLabel}
            </Typography>
          </TableCell> :
          <TableCell colSpan={4} style={{cursor: "pointer"}}>
            <Typography
              style={{color: "#fff", padding: "16px 0"}}
              variant={"h5"}
            >
              {t("titles.enRoute")}
            </Typography>
          </TableCell>
        }
        {
          isFinished ?
          <>
            <TableCell> <Typography>{arrivalLabel}</Typography></TableCell>
            <TableCell padding="dense">
              <Typography>{format(start, "MMM d")}</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography>{format(end, "MMM d")}</Typography>
            </TableCell>
          </>
            : null
        }
      </TableRow>
    </Tooltip>
  )
}, (p, {id}) => id === p.id)

export default withTheme()(withRouter(TripRow))