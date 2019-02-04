import React from 'react'
import {Route, Switch, withRouter, Link} from "react-router-dom"
import {Trans, withTranslation} from 'react-i18next'
import LanguageChooser from './LanguageChooser'
import TestStoreContext from './TestStoreContext'
import NotFound from './NotFound'
import {routes} from './lib/router'
import {Typography, Button} from '@material-ui/core'
import Landing from './Landing'

import OfflineStatus from './components/OfflineStatus'
import Register from './components/Register'
import Profile from './components/Profile'
import Dashboard from './components/Dashboard'

const App = ({t}) =>
  <div className="App">
    <Switch>
      <Route component={Landing} exact path={routes.ROOT}/>
      <Route component={Register} exact path={routes.REGISTER}/>
      <Route component={Profile} exact path={routes.PROFILE}/>
      <Route component={Dashboard} exact path={routes.DASHBOARD}/>
      <Route component={() =>
        <header className="App-header">
          <Button color="primary" component={Link} to="404" variant="outlined">
            {t("links.not-found")}
          </Button>
          <Button color="primary" component={Link} to={routes.REGISTER} variant="outlined">
            {t("links.register")}
          </Button>
          <TestStoreContext/>
          <Typography variant="h3">
            {t('welcome.title', {framework: "react-i18next"})}
          </Typography>
          <Trans i18nKey="welcome.intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </Trans>
          <LanguageChooser/>
        </header>
      } exact path={routes.SETTINGS}
      />
      <Route component={NotFound}/>
    </Switch>
    <OfflineStatus/>
  </div>

export default withRouter(withTranslation('common')(App))