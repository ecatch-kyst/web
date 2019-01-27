import React from 'react'
import Store from '.'

/**
 * HOC implementation of Store context
 * @param {Component} WrappedComponent The component to pass the store values to
 * @returns {Component} new component with the Store values in this.props.store
 */
const withStore = WrappedComponent => props =>
  <Store.Consumer>
    {store => <WrappedComponent {...props } store={store}/>}
  </Store.Consumer>

export default withStore