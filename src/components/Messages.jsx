import React from 'react'
import {withPage} from './shared/Page'
import {List, Typography, ListItem, Grid, Divider} from '@material-ui/core'
import EditIcon from "@material-ui/icons/EditOutlined"
import {Loading} from './shared'
import {withStore} from '../db'
import {withTranslation} from 'react-i18next'

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
export const Message = withTranslation("messages")(({t, RN, TM, status, timeSent}) =>
  <>
  {/* Information to display: id, type(DEP, DCA, POR..), status(sent, not sent) and if youre able to edit it still(12 hour limit)*/}
    <ListItem key={RN}>
      <Grid container spacing={16}>
        <Grid container item>
          <Typography variant="h5">{RN}</Typography>
        </Grid>
        <Grid container item justify="space-between">
          <Typography>{t("titles.message-type")}: {TM}</Typography>
          <Typography>Status: {status}</Typography>
          <Typography>{t("titles.time-sent")}: {timeSent}</Typography><EditIcon/>{/*have a check if 12 hours have passed, choose icon based on this.*/}
          {/*<Typography>{t("titles.length")}</Typography>
          <Typography>{length}m</Typography>*/}
        </Grid>
      </Grid>
    </ListItem>
    <Divider/>
  </>
)
export default withStore(withPage(Messages, {namespace: "messages"}))