import React from 'react'
import {withPage} from './shared/Page'
import {List, Typography, ListItem, Grid, Divider} from '@material-ui/core'
import {Loading} from './shared'
import {withStore} from '../db'
import {withTranslation} from 'react-i18next'

export const Messages =({store: {messages}}) =>
  <List>
    {messages.length ?
      messages.map(message => <Message key={message.id} {...message}/>):
      <Loading/>
    }
  </List>

/*assuming i need some translations later, will let 'willTranslations stand until i know*/
export const Message = withTranslation("message")(({t, id, type, status, timeSent}) =>
  <>
  {/* Information to display: id, type(DEP, DCA, POR..), status(sent, not sent) and if youre able to edit it still(12 hour limit)*/}
    <ListItem key={id}>
      <Grid container spacing={16}>
        <Grid container item>
          <Typography variant="h5">{id}</Typography>
        </Grid>
        <Grid container item justify="space-between">
          <Typography>{type}</Typography>
          <Typography>{status}</Typography>
          <Typography>{timeSent}</Typography>{/*have a check if 12 hours have passed, choose icon based on this.*/}
          {/*<Typography>{t("titles.length")}</Typography>
          <Typography>{length}m</Typography>*/}
        </Grid>
      </Grid>
    </ListItem>
    <Divider/>
  </>
)

export default withStore(withPage(Messages, {namespace: "messages"}))