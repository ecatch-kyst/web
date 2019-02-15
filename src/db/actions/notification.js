import initialValues from "../initialValues.json"


/**
 * Resets the notification. A 100ms delay is added to avoid UI glitches.
 */
export function reset() {
  this.setState(
    ({notification: prevNotification}) => ({
      notification: {...prevNotification, open: false}
    }), () => {
      setTimeout(() => {this.setState({notification: initialValues.notification})}, 100)
    }
  )
}


/**
 * Handles actions that requires a notification to show up
 * @param {object} notification - notification object
 * @param {string} notification.name - Name of the notification. Used for translations
 * @param {'success'|'error'|'warning'|'default'} [notification.type="default"] - Type of the notification. Used for colors
 * @param {function} [notification.action] - The action to execute when the notification is submitted
 * @param {number} [notification.duration=] - Duration in milliseconds after the notification should close.
 * Set to null, if the action should be closed after the action was executed.
 */
export function handle({name, type="default", action=null, duration=2500, message}) {
  this.setState({
    notification: {
      open: true,
      name,
      type,
      duration,
      message,
      handleAction: action ? async () => {
        try {
          await action()
          duration===null && this.resetNotification()
        } catch (error) {console.error(error)}
      } : undefined
    }
  })
}