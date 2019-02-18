import React, {Component} from 'react'
import {withTranslation} from 'react-i18next'
import Select from "react-select"
import {TextField} from '@material-ui/core'

import {validate} from '../../utils'
import Store from '../../db'


/**
 * Dynamic input field
 * @param {object} props
 * @param {string} props.type
 * @param {string} props.id
 * @param {string} [props.defaultValue=""]
 */

class FormInput extends Component {

  static contextType = Store

  state = {
    InputField: TextField
  }

  componentDidMount() {
    const {id, type} = this.props
    const {fields} = this.context

    let InputField
    switch (type) {
    case "select":
      InputField = Select
      break
    default: break
    }

    if (InputField) this.setState({InputField})
    this.setState({value: fields[id] || ""})
  }

  handleChange = ({target: {value}}) => {
    const {id} = this.props
    const error = validate[id](value) // Validating the field
    if (error) {
      console.error(error) // TODO: Add error notification
    } else {
      this.context.handleFieldChange(id, value)
    }
  }

  render() {
    const {InputField} = this.state
    const {t, id, type} = this.props

    return (
      <InputField
        label={t(`labels.${id}`)}
        onChange={this.handleChange}
        type={type}
        value={this.context.fields[id] || ""}
      />
    )
  }
}


export default withTranslation("forms")(FormInput)