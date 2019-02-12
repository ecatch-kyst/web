import React, {Component} from 'react'
import Select from 'react-select'
import Store, {withStore} from '../../db'


class InputDropdown extends Component {
    static contextType = Store

    state = {
      selectedOption: this.props.value
    }

    handleChange = (selectedOption) => {
      this.setState({selectedOption})
    }

    render() {
      const {selectedOption} = this.state
      const {type, tekst} = this.props
      return (
        <Select onChange={this.handleChange} options={type} placeholder={tekst} value={selectedOption}/>
      )
    }
}
export default withStore(InputDropdown)