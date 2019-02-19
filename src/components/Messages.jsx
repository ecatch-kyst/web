import React from 'react'
import {withPage} from './shared/Page'
import {List, Typography, ListItem, Grid, Divider, Button} from '@material-ui/core'
import EditIcon from "@material-ui/icons/EditOutlined"
import {Loading} from './shared'
import {withStore} from '../db'
import {withTranslation} from 'react-i18next'
import {Link} from "react-router-dom"
import {routes} from "../lib/router"

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
          <Typography>{t("titles.time-sent")}: {timeSent}</Typography>{/*have a check if 12 hours have passed, choose icon based on this.*/}
          <Button
            color="primary"
            component={Link}
            size="large"
            to={`${routes.MESSAGES}${routes[RN]}${routes.NEW}`}
            variant="contained"
          >{/*Link to messages/messageId/edit*/}
            <EditIcon/>
          </Button>
          {/*<Typography>{t("titles.length")}</Typography>
          <Typography>{length}m</Typography>*/}
        </Grid>
      </Grid>
    </ListItem>
    <Divider/>
    {/*<Card>
      <CardActionArea>
        <CardContent>
          <Typography variant="h5">
            RN:{RN}
          </Typography>
          <Typography>{t("titles.message-type")}: {TM}</Typography>
          <Typography>Status: {status}</Typography>
          <Typography>{t("titles.time-sent")}: {timeSent}</Typography> have a check if 12 hours have passed, choose icon based on this.
          <Button>
            <EditIcon/>
          </Button>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button>
          close
        </Button>
      </CardActions>
    </Card>*/}
  </>
)
export default withStore(withPage(Messages, {namespace: "messages"}))