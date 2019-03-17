import React from 'react'
import {Link} from "react-router-dom"
import {routes} from "../../lib/router"
import {Centered} from '..'
import {useTranslation} from 'react-i18next'
import Form from './Form'
import {Button, Grid} from '@material-ui/core'
import {useStore} from '../../hooks'

export {Form}


export default () => {
  const {isEnRoute, trips} = useStore()
  return (
    <Centered style={{minHeight: 0}}>
      <Grid alignItems="center" container direction="column" spacing={16} style={{padding: 16}}>
        {isEnRoute ?
          <>
            <FormButton type="DCA"/>
            {trips[0] && trips[0].DCAList.length ?
              <FormButton type="POR"/> : null
            }
          </> :
          <FormButton type="DEP"/>
        }
      </Grid>
    </Centered>
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