import React from 'react'
import './App.css'

import {Trans, withNamespaces} from 'react-i18next'
import LanguageChooser from './LanguageChooser'
import TestStoreContext from './TestStoreContext'


const App = ({t}) =>
  <div className="App">
    <header className="App-header">
      <TestStoreContext/>
      <h1 className="App-title">
        {t('welcome.title', {framework: "react-i18next"})}
      </h1>
      <Trans i18nKey="welcome.intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </Trans>
      <LanguageChooser/>
    </header>
  </div>

export default withNamespaces('common')(App)