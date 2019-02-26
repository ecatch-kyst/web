import React from 'react'
import {withPage} from './shared'
import {Forms} from '.'


const Dashboard = () =>
  <>
    <Forms/>
  </>

export default withPage(Dashboard, {namespace: "dashboard"})