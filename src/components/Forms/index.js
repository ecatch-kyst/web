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
  const {isEnRoute, trips, handleCancelTrip} = useStore()
  return (
    <Grid alignItems="center" container direction="column" spacing={16} style={{padding: 16}} {...props}>
      {isEnRoute ?
          <>
            <FormButton type="DCA"/>
            {(trips.length && !trips[0].DCAList.length) ?
              <DestructButton
                color="primary"
                onClick={handleCancelTrip}
                size="large"
                variant="contained"
              >Cancel trip
              </DestructButton> :
              <FormButton type="POR"/>
            }
          </> :
        <FormButton type="DEP"/>
      }
    </Grid>
  )
}

export const FormButton = ({type}) => {
  const [t] = useTranslation("forms")
  return(
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
    </Grid>
  )
}