import useStore from "./useStore"

/**
 * Hook for Notifications
 */
export default function useNotification() {
  const {
    notification,
    notify,
    processNotificationQueue,
    notificationClose
  } = useStore()

  return ({
    ...notification,
    notify,
    processQueue: processNotificationQueue,
    close: notificationClose
  })
}