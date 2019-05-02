import React, {useCallback, useContext} from 'react'
import {Page} from './shared'
import {Forms, Centered} from '.'
import {Typography, Paper, Switch, Grid, Tooltip} from '@material-ui/core'
import {BrightnessIcon} from '../icons'
import {useTranslation} from 'react-i18next'
import Store from '../db'


export const Home = () => {

  const {DCAStarted, isDarkMode, handleToggleDarkMode} = useContext(Store)
  const [t] = useTranslation("homepage")

  const renderTitle = useCallback(title =>
    <Grid container justify="space-between">
      <Grid item>{title}</Grid>
      <Tooltip title={t("dark-mode")}>
        <Grid
          alignItems="center"
          container item
          onClick={handleToggleDarkMode}
          style={{width: "auto", cursor: "pointer"}}
        >
          <Grid color={isDarkMode ? "primary" : "inherit"} component={BrightnessIcon} item/>
          <Grid checked={isDarkMode} color="primary"
            component={Switch}
            item
          />
        </Grid>
      </Tooltip>
    </Grid>, [isDarkMode]
  )

  return(
    <Page
      namespace="homepage"
      title={renderTitle}
    >
      <Centered heightOffset={-208}>
        {DCAStarted ? <DCAStart/> : null}
        <Forms/>
      </Centered>
    </Page>
  )
}

export default Home

const DCAStart = () =>
  <Paper>
    {/*REVIEW: Show DCA start related fields?*/}
  </Paper>

export const Position = ({latitude="0", longitude="0"}) => <Typography>{latitude} {longitude}</Typography>
