/**
 * Resets the notification. A 100ms delay is added to avoid UI glitches.
 */
export function close() {
  this.setState(({notification}) => ({notification: {...notification, open: false}}))
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

  this.notificationQueue.push({name, type, action, duration, message})

  if (this.state.notification.open) this.notificationClose()
  else this.processNotificationQueue()

}

/**
 * Display notification
 */
export function processQueue() {
  if (this.notificationQueue.length > 0) {

    const notification = this.notificationQueue.shift()
    const {action, duration} = notification

    notification.handleAction = action ? async () => {
      try {
        await action()
        duration === null && setTimeout(() => this.notificationClose(), 500)
      } catch (error) {console.error(error)}
    } : undefined

    this.setState({
      notification: {
        open: true,
        ...notification
      }
    })
  }
}