/* eslint-disable react/prop-types, react/jsx-handler-names */

import React from 'react'
import classNames from 'classnames'
import Select from 'react-select'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import NoSsr from '@material-ui/core/NoSsr'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import MenuItem from '@material-ui/core/MenuItem'
import CancelIcon from '@material-ui/icons/Cancel'
import {emphasize} from '@material-ui/core/styles/colorManipulator'
import {useTranslation} from 'react-i18next'
import {withStore} from '../../../db/index.js'
import {Grid, InputAdornment} from '@material-ui/core'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  input: {
    display: 'flex',
    padding: 0
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden'
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    )
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  divider: {
    height: theme.spacing.unit * 2
  }
})

function NoOptionsMessage(props) {
  return (
    <Typography
      className={props.selectProps.classes.noOptionsMessage}
      color="textSecondary"
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  )
}

function inputComponent({inputRef, ...props}) {
  return <div ref={inputRef} {...props} />
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  )
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      component="div"
      selected={props.isFocused}
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  )
}

function Placeholder(props) {
  return (
    <Typography
      className={props.selectProps.classes.placeholder}
      color="textSecondary"
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  )
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  )
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>
}

function MultiValue(props) {
  return (
    <Chip
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused
      })}
      deleteIcon={<CancelIcon {...props.removeProps} />}
      label={props.children}
      onDelete={props.removeProps.onClick}
      tabIndex={-1}
    />
  )
}

function Menu(props) {
  return (
    <Paper className={props.selectProps.classes.paper} square {...props.innerProps}>
      {props.children}
    </Paper>
  )
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer
}

const IntegrationReactSelect = ({classes, theme, isMulti, placeholder, type, onChange, dataId, value, dropdown: dropdownId, inputType, unit}) => {

  const [t] = useTranslation("forms")

  const handleChange = value => onChange(dataId, value)


  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit'
      }
    })
  }

  const options = t(`dropdowns.${dropdownId}`, {returnObjects: true})


  return (
    <div className={classes.root}>
      <NoSsr>
        <div className={classes.divider} />
        <Select
          classes={classes}
          components={components}
          isMulti={isMulti}
          onChange={handleChange}
          options={options}
          placeholder={placeholder}
          styles={selectStyles}
          textFieldProps={{InputLabelProps: {shrink: true}}}
          value={value}
        />
        <Grid container direction="column" spacing={16} style={{padding: 16}}>
          {Object.entries(value).map(([key, {label, inputValue}]) =>
            <Grid
              component={KeyValueInput}
              id={key}
              inputType={inputType}
              item
              key={key}
              label={label}
              onChange={onChange}
              type={type}
              unit={unit}
              value={inputValue || ""}
            />
          )}
        </Grid>
      </NoSsr>
    </div>
  )
}

const KeyValueInput = withStore(({store: {fields}, id, onChange, label, value, type, inputType, unit}) => {
  const field = fields[type]

  const handleChange = ({target: {name, value}}) => {
    field[name].inputValue = inputType === "number" ? parseInt(value, 10) : value
    onChange(type, field)
  }
  return (
    <TextField
      InputProps={{
        endAdornment: unit ? <InputAdornment position="end">{unit}</InputAdornment> : null
      }}
      label={label}
      name={id}
      onChange={handleChange}
      type={inputType}
      value={value}
    />
  )
})

export default withStyles(styles, {withTheme: true})(IntegrationReactSelect)