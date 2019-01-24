import React from 'react'
import './App.css'

import {translate, Trans} from 'react-i18next'
import LanguageChooser from './LanguageChooser'


const App = ({t}) =>
  <div className="App">
    <header className="App-header">
      <LanguageChooser/>
      <h1 className="App-title">
        {t('welcome.title', {framework: "react-i18next"})}
      </h1>
      <Trans i18nKey="welcome.intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </Trans>
    </header>
  </div>

export default translate('common')(App)

