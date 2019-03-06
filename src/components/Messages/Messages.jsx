import React from 'react'
import {withPage} from '../shared/Page'
import {List, Typography, ListItem, Grid, Divider, Button} from '@material-ui/core'
import EditIcon from "@material-ui/icons/EditOutlined"
import {Loading} from '../shared'
import {withStore} from '../../db'
import {useTranslation} from 'react-i18next'
import {Link} from "react-router-dom"
import {routes} from "../../lib/router"

import CheckIcon from "@material-ui/icons/CheckOutlined"
import CloseIcon from "@material-ui/icons/CloseOutlined"
import HourglassIcon from "@material-ui/icons/HourglassEmptyOutlined"
import {format, addHours, isBefore} from 'date-fns'
import {colors} from '../../lib/material-ui'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import Tooltip from '@material-ui/core/Tooltip'

const [t] = useTranslation("messages")
export const Messages = ({store: {messages}}) =>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>{"Message Id"}</TableCell>
        <TableCell align="right">{t("titles.message-type")}</TableCell>
        <TableCell align="right">Status</TableCell>
        <TableCell align="right">{t("titles.time-sent")}</TableCell>
        <TableCell align="right"></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {messages.length ?
        messages.map(message => <Message key={message.RN} {...message}/>):
        <Loading/>
      }
    </TableBody>
  </Table>
/**
 *
 */

/*assuming i need some translations later, will let 'withTranslations' stand until i know*/
/*RN = message number, TM = message type, use acknowledge to provide state, DA = date sent, TI = time sent*/
const Message = ({RN, TM, acknowledged, created}) => {
  const [t] = useTranslation("messages")
  const disabled = isBefore(addHours(created.toDate(), 12), Date.now())
  return (
    <>
      {/* Information to display: id, type(DEP, DCA, POR..), status(sent, not sent) and if youre able to edit it still(12 hour limit)*/}
      {/*TODO: display this like a table instead of a listItem*/}
      {/*<ListItem key={RN}>
        <Grid container spacing={16}>
          <Grid container item>
            <Typography variant="h5">{RN}</Typography>
          </Grid>
          <Grid container item justify="space-between">
            <Typography>{t("titles.message-type")}: {TM}</Typography>
            {/*Make a status component instead
            <Status acknowledged={acknowledged}/>
            <Typography>{t("titles.time-sent")}: {format(created.toDate(), "yyyy. MMM dd HH:mm")}</Typography>
            <Button
              color="primary"
              component={Link}
              disabled = {disabled}
              size="large"
              to={`${routes.MESSAGES}/DCA/${RN}${routes.EDIT}`}
              variant="contained"
            >Button that if active and clicked will send you to an edit page for the current message
              <EditIcon/>
            </Button>
          </Grid>
        </Grid>
      </ListItem>*/}
        <TableRow key={RN}>
          <TableCell component="th" scope="row">
            {RN}
          </TableCell>
          <TableCell align="right">{TM}</TableCell>
          <TableCell align="right"><Status acknowledged={acknowledged}/></TableCell>
          <TableCell align="right">{format(created.toDate(), "yyyy. MMM dd HH:mm")}</TableCell>
          <TableCell align="right">
            <Button
              color="primary"
              component={Link}
              disabled = {disabled}
              size="large"
              to={`${routes.MESSAGES}/DCA/${RN}${routes.EDIT}`}
              variant="contained"
            >
              <EditIcon/>
            </Button></TableCell>
        </TableRow>
      <Divider/>
    </>
  )
}

export default withStore(withPage(Messages, {namespace: "messages"}))

/*Switch for acknowledged from database*/
const Status = ({acknowledged}) => {
  switch (acknowledged) {
  case undefined:
    return <HourglassIcon style={{color: colors.yellow}}/>
  case true:
    return <CheckIcon style={{color: colors.green}}/>
  case false:
    return <CloseIcon style={{color: colors.red}}/>
  default:
    return null
  }
}
