import React from 'react'

import {Redirect, withRouter} from "react-router-dom"
import {Card, CardContent} from '@material-ui/core'
import {routes} from '../lib/router.js'
import {withStore} from '../db'
import Form from './Forms/Form'
import {isBefore, addHours} from 'date-fns'

export default withStore(withRouter(({store: {messages}, match: {params: {messageId}}}) => {

  const {created} = messages.find(message => message.RN === parseInt(messageId, 10)) || {}
  const disabled = created && isBefore(addHours(created.toDate(), 12), Date.now())
  return (
    <Card>
      {disabled ? <Redirect to={routes.MESSAGES}/>: null}
      <CardContent>
        <Form messageId={messageId} type="DCA"/>
      </CardContent>
    </Card>
  )
}))