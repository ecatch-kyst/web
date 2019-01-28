import React from 'react'
import './App.css'
import {Route, Switch, withRouter, Link} from "react-router-dom"
import {Trans, withNamespaces} from 'react-i18next'
import LanguageChooser from './LanguageChooser'
import TestStoreContext from './TestStoreContext'
import NotFound from './NotFound'
import {routes} from './lib/router'


const App = ({t}) =>
  <div className="App">
    <Switch>
      <Route component={() =>
        <header className="App-header">
          <Link to="test">{t("page.404Link")}</Link>
          <TestStoreContext/>
          <h1 className="App-title">
            {t('welcome.title', {framework: "react-i18next"})}
          </h1>
          <Trans i18nKey="welcome.intro">
        To get started, edit <code>src/App.js</code> and save to reload.
          </Trans>
          <LanguageChooser/>
        </header>
      } exact path={routes.ROOT}
      />
      <Route component={NotFound}/>
    </Switch>
  </div>

export default withRouter(withNamespaces('common')(App))


