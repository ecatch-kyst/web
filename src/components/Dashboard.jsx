import React from 'react'
import {withPage} from './shared'
import {Forms} from '.'
import GoogleMaps from './GoogleMapsCustom/GoogleMapsSelectiveMarker'


export const Dashboard = () =>
  <>
    <Forms/>
    <GoogleMaps
      mapHeight={600}
      mapWidth={600}
    />
  </>

export default withPage(Dashboard, {namespace: "dashboard"})
