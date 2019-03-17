import React from 'react'
import {withRouter} from "react-router-dom"
import EditIcon from "@material-ui/icons/EditOutlined"
import {format, addHours, isBefore} from 'date-fns'
import {TableRow, TableCell, Hidden, Typography, Grid, Tooltip, IconButton} from '@material-ui/core'
import {routes} from '../../../lib/router'
import {useTranslation} from 'react-i18next'
import Status from '../../shared/Status'

export const Message = ({RN, TM, result, created, history}) => {
  const [t] = useTranslation("messages")
  const disabled = isBefore(addHours(created.toDate(), 12), Date.now())
  return (
    <TableRow
      hover={TM === "DCA" && !disabled}
      onClick={() => TM === "DCA" && !disabled ? history.push(`${routes.MESSAGES}/DCA/${RN}${routes.EDIT}`) : null}
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
        {TM === "DCA" ?
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
}

export default withRouter(Message)