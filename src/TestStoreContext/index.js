import React from 'react'
import {withStore} from '../db'
import initValues from '../db/initialValues.json'
import {Button, TextField, Typography} from '@material-ui/core'


export const TestStoreContext = ({store}) =>
  <div>
    <Typography variant="h3">Testing store context</Typography>
    <Button onClick={() => store.handleHelloWorld(store.value)}>Click me!</Button>
    <TextField onChange={e => store.handleChangeValue(e.target.value)} value={store.value}/>
    {
      initValues.value !== store.value &&
      <Button onClick={() => store.handleChangeValue("")}>Clear</Button>
    }
  </div>

export default withStore(TestStoreContext)