/* eslint-disable require-jsdoc */
/* eslint-disable react/prop-types, react/jsx-handler-names */

import React from 'react'
import classNames from 'classnames'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import MenuItem from '@material-ui/core/MenuItem'
import CancelIcon from '@material-ui/icons/Cancel'
import {emphasize} from '@material-ui/core/styles/colorManipulator'
import {withStyles} from '@material-ui/core/styles'
import NoSsr from '@material-ui/core/NoSsr'
import Select from 'react-select'


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

export function GroupLabel (data) {
  return(
    <Typography style={{textDecoration: "underline"}} variant="subtitle2">
      {data.label}
    </Typography>
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

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>
}

function Menu(props) {
  return (
    <Paper className={props.selectProps.classes.paper} square {...props.innerProps}>
      {props.children}
    </Paper>
  )
}


export const components = {
  Control,
  Menu,
  MultiValue,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
  NoOptionsMessage
}


export default withStyles(styles, {withTheme: true})(
  ({components: componentsProp, theme, classes: {root, divider, ...classes}, ...props}) =>
    <div className={root}>
      <NoSsr>
        <Select
          {...props}
          classes={classes}
          components={{...components, ...componentsProp}}
          formatGroupLabel={GroupLabel}
          styles={{
            input: base => ({
              ...base,
              color: theme.palette.text.primary,
              '& input': {
                font: 'inherit'
              }
            })
          }}
        />
        <div className={divider} />
      </NoSsr>
    </div>
)