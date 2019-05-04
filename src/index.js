import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter as Router} from "react-router-dom"
import {MuiThemeProvider} from '@material-ui/core/styles'
import App from './App'
import "./lib/firebase"
import {light, dark} from "./lib/material-ui"
import "./main.sass"
import Store, {Database} from './db'

import i18n from "./lib/i18n"
import {I18nextProvider} from 'react-i18next'


import "./components/shared/Notification"
import * as serviceWorker from './serviceWorker'

render(
  <I18nextProvider i18n={i18n}>
    <Router>
      <Database>
        <Store.Consumer>
          {({isDarkMode}) =>
            <MuiThemeProvider theme={isDarkMode ? dark : light}>
              <App/>
            </MuiThemeProvider>
          }
        </Store.Consumer>
      </Database>
    </Router>
  </I18nextProvider>,
  document.getElementById('root')
)

serviceWorker.register()
