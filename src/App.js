import React from 'react'
import {Route, Switch, withRouter, Link} from "react-router-dom"
import {Trans, withNamespaces} from 'react-i18next'
import LanguageChooser from './LanguageChooser'
import TestStoreContext from './TestStoreContext'
import NotFound from './NotFound'
import {routes} from './lib/router'
import {Typography, Button} from '@material-ui/core'
import Landing from './Landing'

import OfflineStatus from './components/OfflineStatus'

const App = ({t}) =>
  <div className="App">
    <Switch>
      <Route component={Landing} exact path={routes.ROOT}/>
      <Route component={() =>
        <header className="App-header">
          <Button color="primary" component={Link} to="404" variant="outlined">
            {t("not-found.go-to")}
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
      } exact path={routes.TEST}
      />
      <Route component={NotFound}/>
    </Switch>
    <OfflineStatus/>
  </div>

export default withRouter(withNamespaces('common')(App))