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
 * @param {string} type - Type of the dialog. Used for translations
 * @param {function} submit - The action to execute when the dialog is submitted
 * @param {function} cancel - The action to execute when the dialog is cancelled
 * @param {boolean} [isDestructive=false] - Is the submit action destructive?
 * Meaning the action leads to data loss (remove, delete etc.)
 */
export function handle(type, submit, cancel, isDestructive=false) {
  this.setState({
    dialog: {
      open: true,
      type,
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