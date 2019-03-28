import React from 'react'
import {withPage} from './shared'
import {Forms} from '.'


export const HomePage = () =>
  <>
    <Forms/>
  </>

export default withPage(HomePage, {namespace: "homepage"})