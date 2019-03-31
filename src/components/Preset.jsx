import React from 'react'
import {withPage} from './shared'
import {AddActivity, AddSpecie, AddZO, AddFishingPermit, AddPort, AddTool} from './Forms/components'


export const Preset = () =>
  <>
    <AddActivity/>
    <AddSpecie/>
    <AddZO/>
    <AddFishingPermit/>
    <AddPort/>
    <AddTool/>
  </>

export default withPage(Preset, {namespace: "preset"})