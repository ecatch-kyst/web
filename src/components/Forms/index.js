import React from 'react'

import Form from './Form'
import {Grid} from '@material-ui/core'
import {useStore} from '../../hooks'
import {FormButton} from './FormButton'
export {Form}


export const Forms = props => {
  const {isEnRoute, trips, DCAStarted} = useStore()
  return (
    <Grid
      alignItems="center"
      container
      direction="column"
      {...props}
    >
      {isEnRoute ? // This block is only shown if a DEP has been submitted, but no POR yet.
          <>
            {/**DCA button only displayed, when a DCA0 form is submitted*/}
            <FormButton show={DCAStarted && (trips[0] && !trips[0].isFinished)} type="DCA"/>
            {/**DCA button only displayed, when a DCA0 form is submitted*/}
            <FormButton DCAStarted={DCAStarted} type="DCA0"/>
            {/**POR button only displayed, when the last trip has some DCA messages*/}
            <FormButton show={trips[0] && trips[0].DCAList.length} type="POR"/>
          </> :
        <FormButton type="DEP"/>
      }
    </Grid>
  )
}

export default Forms

