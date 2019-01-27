import React from 'react'
import {withStore} from '../db'
import initValues from '../db/initialValues.json'


export const TestStoreContext = ({store}) =>
  <div>
    <h3>Testing store context</h3>
    <button onClick={() => store.handleHelloWorld(store.value)}>Click me!</button>
    <input autoFocus onChange={e => store.handleChangeValue(e.target.value)} value={store.value}/>
    {
      initValues.value !== store.value &&
      <button onClick={() => store.handleChangeValue("")}>Clear</button>
    }
    <hr/>
  </div>

export default withStore(TestStoreContext)