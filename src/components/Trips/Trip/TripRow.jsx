import React from 'react'
import {withRouter} from "react-router-dom"
import {format} from 'date-fns'
import {Tooltip, TableRow, TableCell, Typography, withTheme} from '@material-ui/core'

import {routes} from '../../../lib/router'
import {useTranslation} from 'react-i18next'


export default withTheme()(withRouter(({theme, id, history, POR, DEP, start, end, isFinished}) => {
  const [t] = useTranslation("trips")
  return (
    <Tooltip title={isFinished ? "": t("tooltips.enRoute")}>
      <TableRow hover onClick={() => history.push(`${routes.TRIPS}/${id}`)}
        style={{backgroundColor: isFinished ? "" : theme.palette.primary.main}}
      >
        <TableCell>
          <Typography
            style={isFinished ? undefined : {color: "#fff", padding: "16px 0"}}
            variant={isFinished ? undefined : "h5"}
          >
            {isFinished ? DEP.PO : t("titles.enRoute")}
          </Typography>
        </TableCell>
        <TableCell> {isFinished ? <Typography>{POR.PO}</Typography> : ""}</TableCell>
        <TableCell align="right">
          <Typography style={{color: isFinished ? "" : "#fff"}}
            variant={isFinished ? undefined : "h5"}
          >{format(start, "MMM d")}</Typography>
        </TableCell>
        <TableCell align="right">
          {isFinished ? <Typography>{format(end, "MMM d")}</Typography> : ""}
        </TableCell>
      </TableRow>
    </Tooltip>
  )
}))
