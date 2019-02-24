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
import {colors} from '../lib/material-ui'


/*var d = new Date("2007-07-01")
var m = new Date("1942-07-01")
var flag = 0
difference = d-m
if(difference > 12){
  flag = 1
}*/
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
          <Button
            color="primary"
            component={Link}
            size="large"
            to={`${routes.MESSAGES}/${RN}${routes.EDIT}`}
            variant="contained"
          >{/*Goal: Link to messages/messageId/edit*/}
            <EditIcon/>
          </Button>
        </Grid>
      </Grid>
    </ListItem>
    <Divider/>
  </>
)
export default withStore(withPage(Messages, {namespace: "messages"}))

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