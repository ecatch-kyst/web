import React from 'react'
import {withPage} from './shared'
import Departure from './Departure'


const Dashboard = () =>
  <>
    <Departure/>
  </>

export default withPage(Dashboard, {namespace: "dashboard"})