import React from 'react'
import {BrowserRouter} from "react-router-dom"

module.exports = {
  BrowserRouter: ({children}) => <div>{children}</div>,
  Route: ({children}) => <div>{children}</div>,
  Link: ({children, to}) => <a href="mocked" to={to}>{children}</a>,
  withRouter: () => Component => props => <BrowserRouter><Component {...props}/></BrowserRouter>,
  Redirect: ({to}) => <div to={to}/>,
  Switch: ({children}) => <div>{children}</div>
}