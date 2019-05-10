/**
 * Handles actions that requires a notification to show up
 * @see src/locales/{language}/common.json
 * @param {object} notification - notification object
 * @param {string} notification.name - Name of the notification, used for translations.
 * @param {'success'|'error'|'warning'|'default'} [notification.type="default"] - Type of the notification. Used for colors, and translations.
 * @param {function|null} [notification.action=null] - Optional action to execute. Set to null or leave out, if the notification has no action.
 * @param {number} [notification.duration=2500] - Duration in milliseconds after the notification should close.
 * @param {string} [notification.message=""] - Duration in milliseconds after the notification should close.
 */
export function handle({name, type="default", action=null, duration=2500, message=""}) {

  this.notificationQueue.push({name, type, action, duration, message})

  if (this.state.notification.open) this.notificationClose()
  else this.processNotificationQueue()

}

/**
 * Takes a notification from the notification queue, and displays it.
 */
export function processQueue() {
  if (this.notificationQueue.length > 0) {

    const notification = this.notificationQueue.shift()
    const {action, duration} = notification

    notification.handleAction = action ? async () => {
      try {
        await action()
        duration === null && setTimeout(() => this.notificationClose(), 500)
      } catch (error) {console.error(error)} //REVIEW: Add more meaningful error handling. Maybe error notification?
    } : undefined

    this.setState({
      notification: {
        open: true,
        ...notification
      }
    })
  }
}

/**
 * Resets the notification.
 */
export function close() {
  this.setState(({notification}) => ({notification: {...notification, open: false}}))
}