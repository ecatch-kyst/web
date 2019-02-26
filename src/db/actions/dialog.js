import initialValues from "../initialValues.json"

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
 * @param {function} [dialog.submit] - The action to execute when the dialog is submitted
 * @param {function} dialog.cancel - The action to execute when the dialog is cancelled
 * @param {function|string|null} [dialog.children=null] - The action to execute when the dialog is cancelled
 * @param {boolean} [dialog.isDestructive=false] - Is the submit action destructive?
 * Meaning the action leads to data loss (remove, delete etc.)
 */
export function handle({type, submit, cancel, isDestructive=false, children=null}) {
  this.setState({
    dialog: {
      open: true,
      type,
      children,
      isDestructive,
      handleSubmit: () => {
        submit && submit()
        this.resetDialog()
      },
      handleCancel: () => {
        cancel && cancel()
        this.resetDialog()
      }
    }
  })
}