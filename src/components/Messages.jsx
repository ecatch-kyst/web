import React from 'react'
import {withPage} from './shared/Page'
import {List, Typography, ListItem, Grid, Divider, Button} from '@material-ui/core'
import EditIcon from "@material-ui/icons/EditOutlined"
import {Loading} from './shared'
import {withStore} from '../db'
import {withTranslation} from 'react-i18next'
import {Link} from "react-router-dom"
import {routes} from "../lib/router"


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

/*assuming i need some translations later, will let 'willTranslations stand until i know*/
/*RN = message number, TM = message type, use acknowledge to provide state, DA = date sent, TI = time sent*/
export const Message = withTranslation("messages")(({t, RN, TM, acknowledged, timeSent}) =>
  <>
  {/* Information to display: id, type(DEP, DCA, POR..), status(sent, not sent) and if youre able to edit it still(12 hour limit)*/}
    <ListItem key={RN}>
      <Grid container spacing={16}>
        <Grid container item>
          <Typography variant="h5">{RN}</Typography>
        </Grid>
        <Grid container item justify="space-between">
          <Typography>{t("titles.message-type")}: {TM}</Typography>
          <Typography>Status: {acknowledged}</Typography>{/*undefined=pending, true = sent/acknowledged, false=failed/not acknowledged*/}
          <Typography>{t("titles.time-sent")}: {timeSent}</Typography>{/*have a check if 12 hours have passed, choose icon based on this.*/}
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