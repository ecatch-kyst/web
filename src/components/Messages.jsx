import React from 'react'
import {withPage} from './shared/Page'
import {List, Typography, ListItem, Grid, Divider, Button} from '@material-ui/core'
import EditIcon from "@material-ui/icons/EditOutlined"
import {Loading} from './shared'
import {withStore} from '../db'
import {withTranslation} from 'react-i18next'
import {Link} from "react-router-dom"
import {routes} from "../lib/router"

import CheckIcon from "@material-ui/icons/CheckOutlined"
import CloseIcon from "@material-ui/icons/CloseOutlined"
import HourglassIcon from "@material-ui/icons/HourglassEmptyOutlined"
import {format, isAfter, addHours} from 'date-fns'
import {colors} from '../lib/material-ui'

/*import PropTypes from 'prop-types'
import classNames from 'classnames'
import {withStyles} from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Paper from '@material-ui/core/Paper'
import {AutoSizer, Column, SortDirection, Table} from 'react-virtualized'*/

/* Old code, dont know how to translate this into table yet*/
export const Messages =({store: {messages}}) =>
  <List>
    {messages.length ?
      messages.map(message => <Message key={message.RN} {...message}/>):
      <Loading/>
    }
  </List>

/*assuming i need some translations later, will let 'withTranslations' stand until i know*/
/*RN = message number, TM = message type, use acknowledge to provide state, DA = date sent, TI = time sent*/
export const Message = withTranslation("messages")(({t, RN, TM, acknowledged, created}) =>
  <>
  {/* Information to display: id, type(DEP, DCA, POR..), status(sent, not sent) and if youre able to edit it still(12 hour limit)*/}
{/*TODO: display this like a table instead of a listItem*/}
<ListItem key={RN}>
  <Grid container spacing={16}>
    <Grid container item>
      <Typography variant="h5">{RN}</Typography>
    </Grid>
    <Grid container item justify="space-between">
      <Typography>{t("titles.message-type")}: {TM}</Typography>
      {/*Make a status component instead */}
      <Typography>Status: {Status}</Typography>
      <Status acknowledged={acknowledged}/>
      <Typography>{t("titles.time-sent")}: {format(created.toDate(), "yyyy. MMM dd HH:mm")}</Typography>
      <Button
        color="primary"
        component={Link}
        disabled = {editable(created, TM)}
        size="large"
        to={`${routes.MESSAGES}/${RN}${routes.EDIT}`}
        variant="contained"
      >{/*Button that if active and clicked will send you to an edit page for the current message*/}
        <EditIcon/>
      </Button>
    </Grid>
  </Grid>
</ListItem>
  <Divider/>
  </>
)
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

/**
 * Check if the user should still be able to edit the message.
 */
function editable(created, TM){
  const createdAddedHours = addHours(created.toDate(), 12)
  const currentDate = Date.now()
  /*TODO: make sure this actually works with a DCA message, only have POR for now.*/
  if(isAfter(currentDate, createdAddedHours) /*&& TM !== "DCA"*/){
    return true
  }
  else{
    return false
  }
}
