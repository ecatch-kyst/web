import React from 'react'
import {withPage} from '../shared/Page'
import {List, Typography, ListItem, Grid, Divider, Button} from '@material-ui/core'
import EditIcon from "@material-ui/icons/EditOutlined"
import {Loading} from '../shared'
import {withStore} from '../../db'
import {useTranslation, withTranslation} from 'react-i18next'
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
//import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Tooltip from '@material-ui/core/Tooltip'

export const Messages = ({store: {messages}}) =>
  <Table>
    <MessageTableHead/>
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
/*RN = message number, TM = message type, acknowledged to provide state, TI = time sent*/
const Message = ({RN, TM, acknowledged, created}) => {
  const [t] = useTranslation("messages")
  const disabled = isBefore(addHours(created.toDate(), 12), Date.now())
  return (
    <>
      {/* Information to display: id, type(DEP, DCA, POR..), status(sent, not sent) and if youre able to edit it still(12 hour limit)*/}
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
      {/*Attempt at sorting, does not work yet */}
      {/*<TableBody>
        {stableSort(Message, getSorting(order, orderBy))
          .map(n => {
            return (
              <TableRow
                hover
                key={n.id}
                onClick={event => this.handleClick(event, n.id)}
                tabIndex={-1}
              >
                <TableCell component="th" padding="none" scope="row">
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
            )
          })}
        </TableBody>*/}
      <Divider/>
    </>
  )
}

export default withTranslation("messages")(withStore(withPage(Messages, {namespace: "messages"})))
const [t] = useTranslation("messages")
class MessageTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property)
  }

  render() {
    const {order, orderBy, rowCount, RN} = this.props

    return (
      <TableHead>
        <TableRow>
          <TableCell>{"Message Id"}</TableCell>
          <TableCell align="right">{t("titles.message-type")}</TableCell>
          <TableCell align="right">Status</TableCell>
          <TableCell align="right">{t("titles.time-sent")}</TableCell>
          <TableCell align="right"></TableCell>
          <TableCell
            key={RN}
            sortDirection={orderBy === RN ? order : false}
          >

            <Tooltip
              enterDelay={300}
              title="Sort"
            >
              <TableSortLabel
                active={orderBy === RN}
                direction={order}
                onClick={this.createSortHandler(RN)}
              >
                {}
              </TableSortLabel>
            </Tooltip>
          </TableCell>
          {/*}),
            this,
          )}*/}
        </TableRow>
      </TableHead>
    )
  }
}
/**
 * code from example
 */
function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}
/**
 *code from example
 */
function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}
/**
 *code from example
 */
function handleRequestSort(event, property){
  const orderBy = property
  let order = 'desc'

  if (this.state.orderBy === property && this.state.order === 'desc') {
    order = 'asc'
  }

  this.setState({order, orderBy})
}


/**
 *code from example
 */
function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy)
}

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
