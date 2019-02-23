/* eslint-disable require-jsdoc */
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
import dropdown from "./dropdown.json"
import {useTranslation} from 'react-i18next'
import AddFishingSpot from "./AddFishingSpot"

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
    <AddFishingSpot/>
    // <Typography
    //   className={props.selectProps.classes.noOptionsMessage}
    //   color="textSecondary"
    //   {...props.innerProps}
    // >
    //   {props.children}
    // </Typography>
  )
}

function inputComponent({inputRef, ...props}) {
  return <div ref={inputRef} {...props} />
}

function Control(props) {
  return (
    <TextField
      fullWidth
      // eslint-disable-next-line react/jsx-sort-props
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        }
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

const IntegrationReactSelect = ({classes, theme, isMulti, customizable, placeholder, type, onChange, dataId, value}) => {

  const [t] = useTranslation("dropdown")

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

  const options = dropdown[type] || t(type, {returnObjects: true})

  return (
    <div className={classes.root}>
      <NoSsr>
        <div className={classes.divider} />
        {customizable && <AddFishingSpot/>}
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
      </NoSsr>
    </div>
  )
}


export default withStyles(styles, {withTheme: true})(IntegrationReactSelect)