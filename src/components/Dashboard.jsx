import React from 'react'
import {withPage} from './shared'
import {Forms} from '.'


export const Dashboard = () =>
  <>
    <Forms/>
  </>

export default withPage(Dashboard, {namespace: "dashboard"})