import React from 'react'
import {Redirect} from "react-router-dom"
import {Grid, Typography, CircularProgress, Paper} from '@material-ui/core'
import {AUTH} from '../../lib/firebase'
import {routes} from '../../lib/router'
import {useTranslation} from 'react-i18next'
import {withStore} from '../../db'
import Centered from '../Centered'


const Page = withStore(({children, isProtected, store: {isLoading}, namespace, title, subtitle, headerProps, ...props}) => {
  const [t] = useTranslation(namespace)
  return(
    <Grid container direction="column" {...props}>
      {
        isLoading ?
          <Centered>
            <CircularProgress/>
          </Centered> :
          (isProtected && !AUTH.currentUser) ?
            <Redirect to={routes.ROOT}/> :
        <>
        <Paper {...headerProps} square>
          <Typography
            style={{padding: subtitle ? "24px 24px 0" : "24px 24px 16px"}}
            variant="h4"
          >
            {title || t("titles.main")}
          </Typography>
          {subtitle ? <Typography style={{padding:"0 24px 16px"}} variant="h6"> {subtitle}</Typography> : null}
        </Paper>
          {children}
        </>
      }
    </Grid>
  )
})

Page.defaultProps = {
  namespace: "common",
  isProtected: true,
  headerProps: {
    elevation: 0
  }
}

export default Page


/**
 * HOC for Page component
 * @param {React.Component} WrappedComponent - Component to wrap inside Page
 * @param {Object} options - page options
 * @param {string} [options.namespace="common"] - namespace to use for translations
 * @param {boolean} [options.isProtected=true] - should the Component be
 * unreachable without authentication
 */
export const withPage = (WrappedComponent, options) => props =>
  <Page {...options}>
    <WrappedComponent {...props}/>
  </Page>