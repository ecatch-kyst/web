import React from 'react'

import {Redirect, withRouter} from "react-router-dom"
import {routes} from '../../../lib/router.js'
import Form from '../../Forms/Form'
import {isBefore, addHours} from 'date-fns'
import {useStore} from '../../../hooks'

export const EditCatch = ({match: {params: {messageId, type}}}) => {
  const {messages} = useStore()

  const {created, TM} = messages.find(message => message.RN.toString() === messageId) || {}

  const disabled = (type !== "DCA" || TM !== "DCA") || (created && isBefore(addHours(created.toDate(), 12), Date.now()))
  return (
    disabled ?
      <Redirect to={routes.TRIPS}/> :
      <Form match={{params: {messageId, type:"DCA"}}}/>
  )
}

export default withRouter(EditCatch)