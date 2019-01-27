import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'


import i18next from "./lib/i18next"
import {I18nextProvider} from 'react-i18next'

import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <I18nextProvider i18n={i18next}>
    <App/>
  </I18nextProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
