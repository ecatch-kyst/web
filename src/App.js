import React from 'react'
import './App.css'

import {Trans, withNamespaces} from 'react-i18next'
import LanguageChooser from './LanguageChooser'
import {withStore} from './db'
import initValues from './db/initialValues.json'


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


const TestStoreContext = withStore(({store}) =>
  <div>
    <h3>Testing store context</h3>
    <button onClick={() => store.handleHelloWorld(store.value)}>Click me!</button>
    <input autoFocus onChange={e => store.handleChangeValue(e.target.value)} value={store.value}/>
    {
      initValues.value !== store.value &&
      <button onClick={() => store.handleChangeValue("")}>Clear</button>
    }
    <hr/>
  </div>
)