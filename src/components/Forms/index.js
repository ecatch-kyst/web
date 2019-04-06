import React from 'react'
import {Link} from "react-router-dom"
import {routes} from "../../lib/router"
import {useTranslation} from 'react-i18next'
import Form from './Form'
import {Button, Grid} from '@material-ui/core'
import {useStore} from '../../hooks'
import {DestructButton} from '../shared'

export {Form}


export default props => {
  const {isEnRoute, trips, DCAStarted} = useStore()
  return (
    <Grid alignItems="center" container direction="column" spacing={16} style={{padding: 16}} {...props}>
      {isEnRoute ?
          <>
            <FormButton show={DCAStarted && (trips[0] && !trips[0].isFinished)} type="DCA"/>
            <FormButton type="DCA0"/>
            <FormButton show={trips[0] && trips[0].DCAList.length} type="POR"/>
          </> :
        <FormButton type="DEP"/>
      }
    </Grid>
  )
}

export const FormButton = ({type, show}) => {
  const [t] = useTranslation("forms")
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
          {t(`links.${type}`)}
        </Button>
      </Grid> : null
  )
}

FormButton.defaultProps = {
  show: true
}