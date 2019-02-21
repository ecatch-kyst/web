import React from 'react'
import {withPage} from './shared'
import Departure from './Departure'
import {Forms} from '.'


const Dashboard = () =>
  <>
    <Departure/>
    <Forms/>
  </>

export default withPage(Dashboard, {namespace: "dashboard"})