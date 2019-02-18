import {useContext} from "react"
import Store from "../db"

/**
 * Hook for Notifications
 */
export default function useNotification() {
  const {
    notification,
    notify,
    processNotificationQueue,
    notificationClose
  } = useContext(Store)

  return ({
    ...notification,
    notify,
    processQueue: processNotificationQueue,
    close: notificationClose
  })
}