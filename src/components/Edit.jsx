import React, {useContext} from 'react'

import {Link, Redirect} from "react-router-dom"
import {Button, /*Grid, Divider, Typography,*/ Card, CardActionArea, CardContent, CardActions} from '@material-ui/core'
import {routes} from '../lib/router.js'
import {useTranslation, withTranslation} from 'react-i18next'
//import {withPage} from './shared/Page'
import Store from '../db'


/*implement the Editing page*/
/*Link 'sumbit' to send to firebase and to send you back to /messages*/
/*What is needed? different for each message type... could I just use Forms?
* How to send edit message... as new message or with same ID as the one you want to edit?
*/
/*Type should be DEP etc.?  */
/**
 */
function Edit({match: {params:{messageId}}}){
  const [t] = useTranslation("") //TODO: make edit translations
  const store = useContext(Store)

  /**
   * Submits the filled out form.
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
          {/*Have some kind of form here, could we use the forms that already exist?*/}
          {/*<Grid component="form" item onSubmit={handleSubmit}>
            {form && form.length ? form.map(({id, fields}) => // If a valid form, iterate over its blocks
            <Grid container direction="column" key={id} spacing={16} style={{paddingBottom: 32}}>
                <Grid component={Typography} item variant="subtitle2">{t(`${type}.steps.${id}`)}</Grid>
                {fields.map(({id, type, value}) => // Iterate over all the input fields in a Form block
                <Grid item key={id}>
                    <FormInput // TODO: Extract into FormInput component. Add validation, change handlers etc. Use Store to store values for each forms.
                    defaultValue={value}
                    id={id}
                    type={type}
                    />
                </Grid>
                )}
                <Divider style={{marginTop: 16}}/>
            </Grid>
            ) :
            <Redirect to={routes.MESSAGES}/> // If the form is invalid, redirect to the messages page?
            }
        </Grid>*/}
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/*Submit or maybe save? Submit and redirect to messages page*/}
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

export default withTranslation("")(Edit)