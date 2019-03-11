import React from 'react'
import {withRouter} from "react-router-dom"
import EditIcon from "@material-ui/icons/EditOutlined"
import {format, addHours, isBefore} from 'date-fns'
import {TableRow, TableCell, Hidden, Typography, Grid, Tooltip, IconButton} from '@material-ui/core'
import Status from './Status'
import {routes} from '../../../lib/router'
import {useTranslation} from 'react-i18next'

export default withRouter(({RN, TM, result, created, history}) => {
  const [t] = useTranslation("messages")
  const editURL = `${routes.MESSAGES}/DCA/${RN}${routes.EDIT}`
  const disabled =isBefore(addHours(created.toDate(), 12), Date.now())
  const isDCA = TM === "DCA"
  return (
    <TableRow
      hover={isDCA && !disabled}
      onClick={() => isDCA && !disabled ? history.push(editURL) : null}
    >
      <TableCell><Status result={result}/></TableCell>
      <TableCell>
        <Grid container justify="flex-end" spacing={8}>
          <Grid item>
            <Hidden mdDown>
              <Typography variant="caption">
            ({t(`titles.${TM}`)})
              </Typography>
            </Hidden>
          </Grid>
          <Grid item>
            <Typography>{TM}</Typography>
          </Grid>
        </Grid>
      </TableCell>
      <TableCell align="right">
        <Tooltip title={format(created.toDate(), "yyyy. MMMM dd HH:mm")}>
          <Typography>
            {format(created.toDate(), "MMM d. HH:mm")}
          </Typography>
        </Tooltip>
      </TableCell>
      <TableCell align="right">
        {isDCA ?
          <IconButton
            color="primary"
            disabled={disabled}
            size="large"
            variant="text"
          >
            <EditIcon/>
          </IconButton> :
          null
        }
      </TableCell>
    </TableRow>
  )
})