import initialValues from "../initialValues.json"
//import {Component} from 'react'

/**
 * Resets the dialog. A 100ms delay is added to avoid UI glitches.
 */
export function reset() {
  this.setState(({dialog: prevDialog}) => ({
    dialog: {...prevDialog, open: false}}), () => {
    setTimeout(() => {
      this.setState({dialog: initialValues.dialog})
    }, 100)
  }
  )
}


/**
 * Handles actions that requires a modal to show up
 * @param {object} dialog - Dialog object
 * @param {string} dialog.type - Type of the dialog. Used for translations
 * @param {function} dialog.submit - The action to execute when the dialog is submitted
 * @param {function} dialog.cancel - The action to execute when the dialog is cancelled
 * @param {boolean} [dialog.isDestructive=false] - Is the submit action destructive?
 * @param {Component} [dialog.children=null] - Extra content
 * Meaning the action leads to data loss (remove, delete etc.)
 */
export function handle({type, submit, cancel, isDestructive=false, children=null}) {
  this.setState({
    dialog: {
      open: true,
      type,
      children,
      isDestructive,
      handleSubmit: async () => {
        if (submit) {
          try {
            await submit()
            this.resetDialog()
          } catch (error) {
            console.log(error)
          }
        }
      },
      handleCancel: async () => {
        try {
          if (cancel) await cancel()
          this.resetDialog()
        } catch (error) {
          console.log(error)
        }
      }
    }
  })
}