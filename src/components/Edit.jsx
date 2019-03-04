import React, {useContext} from 'react'

import {Link, Redirect} from "react-router-dom"
import {Button, /*Grid, Divider, Typography,*/ Card, CardActionArea, CardContent, CardActions} from '@material-ui/core'
import {routes} from '../lib/router.js'
import {useTranslation, withTranslation} from 'react-i18next'
//import {withPage} from './shared/Page'
import Store from '../db'
//import {Forms} from '.'
import Form from './Forms/Form'

/*implement the Editing page*/
/*Link 'sumbit' to send to firebase and to send you back to /messages*/
/**
 */
function Edit({match: {params:{messageId}}}){
  const [t] = useTranslation("") //TODO: make edit translations
  const store = useContext(Store)

  /**
   * Submits the filled out form.
   * As I try to use the existing Forms, this should not be needed?
   * Forms redirects to dashboard, and i want to redirect to messages, this is why this is still here.
   */
  function handleSubmit (e) {
    e.preventDefault && e.preventDefault()
    // TODO: Submit form with dialog and notification.
    store.handleDialog(messageId, () => store.submitMessage(messageId))
  }
  return(
    <Card>
      <CardActionArea>
        <CardContent>
          {/*Use the form that already exists, send it messageId and type (Type should only be DCA?*/}
          <Form/>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/*Call it submit or maybe save? Submit and redirect to messages page*/}
        <Button
          color="primary"
          onClick={handleSubmit}
          size="large"
          to={routes.MESSAGES}
          variant="contained"
        >
          {t(`${messageId}.submit`)}
        </Button>
        {/*Redirect back to the messages page without submitting.*/}
        <Button
          color="secondary"
          component={Link}
          size="large"
          to={routes.MESSAGES}
        >
          {t("links.back")}
        </Button>
      </CardActions>
    </Card>)
}

/*TODO: Add translations*/
export default withTranslation("")(Edit)