import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from "react-router-dom"
import {MuiThemeProvider} from '@material-ui/core/styles'
import App from './App'
import "./lib/firebase"
import {light, dark} from "./lib/material-ui"
import "./main.sass"
import Store, {Database} from './db'

import i18next from "./lib/i18next"
import {I18nextProvider} from 'react-i18next'

import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <I18nextProvider i18n={i18next}>
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register()
