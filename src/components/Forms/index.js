import React, {memo} from 'react'
import {Link} from "react-router-dom"
import {routes} from "../../lib/router"
import {useTranslation} from 'react-i18next'
import Form from './Form'
import {Button, Grid} from '@material-ui/core'
import {useStore} from '../../hooks'

export {Form}


export default props => {
  const {isEnRoute, trips, DCAStarted} = useStore()
  return (
    <Grid alignItems="center" container direction="column" spacing={16} style={{padding: 16}} {...props}>
      {isEnRoute ?
          <>
            <FormButton show={DCAStarted && (trips[0] && !trips[0].isFinished)} type="DCA"/>
            <FormButton DCAStarted={DCAStarted} type="DCA0"/>
            <FormButton show={trips[0] && trips[0].DCAList.length} type="POR"/>
          </> :
        <FormButton type="DEP"/>
      }
    </Grid>
  )
}

export const FormButton = memo(({type, show, DCAStarted}) => {
  const [t] = useTranslation("forms")
  const label = t(`links.${type === "DCA0" && DCAStarted ? "DCA0Edit" : type}`)
  return(
    show ?
      <Grid item>
        <Button
          color="primary"
          component={Link}
          size="large"
          to={`${routes.MESSAGES}${routes[type]}${routes.NEW}`}
          variant="contained"
        >
          {label}
        </Button>
      </Grid> : null
  )
})

FormButton.defaultProps = {
  show: true
}