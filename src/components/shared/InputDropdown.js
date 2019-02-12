import React, {Component} from 'react'
import Select from 'react-select'
import {TextField, MenuItem} from '@material-ui/core'
import Store, {withStore} from '../../db'


class InputDropdown extends Component {
    static contextType = Store

    state = {
      selectedOption: this.context.ports[0]
    }

    handleChange = (selectedOption) => {
      this.setState({selectedOption})
    }


    render() {
      console.log(this.context.ports)

      const {selectedOption} = this.state
      const {ports} = this.context
      return (
        <Select onChange={this.handleChange} options={ports} value={selectedOption}/>
      )
    }
}
export default InputDropdown