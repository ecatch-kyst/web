import React from 'react'

import {Redirect, withRouter} from "react-router-dom"
import {routes} from '../../../lib/router.js'
import {withStore} from '../../../db'
import Form from '../../Forms/Form'
import {isBefore, addHours} from 'date-fns'

export const EditMessage = ({store: {messages}, match: {params: {messageId}}}) => {

  const {created, TM} = messages.find(message => message.RN === parseInt(messageId, 10)) || {}
  const disabled =
    TM !== "DCA" ||
    (created && isBefore(addHours(created.toDate(), 12), Date.now()))
  return (
    disabled ?
      <Redirect to={routes.MESSAGES}/> :
      <Form match={{params: {messageId, type:"DCA"}}}/>
  )
}

export default withStore(withRouter(EditMessage))