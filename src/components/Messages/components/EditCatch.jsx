import React, {useContext} from 'react'

import {Redirect, withRouter} from "react-router-dom"
import {routes} from '../../../lib/router.js'
import Form from '../../Forms/Form'
import Store from '../../../db'
import {deadlinePassed} from '../../../utils'

export const EditCatch = ({match: {params: {messageId, type}}}) => {
  const {messages} = useContext(Store)

  const {created, TM} = messages.find(message => message.RN.toString() === messageId) || {}

  const disabled = TM !== "DCA" || type !== "DCA" || deadlinePassed(created)

  return (
    disabled ?
      <Redirect to={routes.TRIPS}/> :
      <Form match={{params: {messageId, type:"DCA"}}}/>
  )
}

export default withRouter(EditCatch)