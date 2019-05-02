import {useState, useEffect, useContext} from "react"
import Store from "../db"

/**
 * Hook that returns the status of internet connection,
 * responsive to connection changes.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/Online_and_offline_events
 */
export default function useOnline() {
  const [online, setOnline] = useState(navigator.onLine)
  const {notify} = useContext(Store)

  const handelConnectionChange = () => {
    const online = navigator.onLine
    setOnline(online)
    if (!online) notify({name: "offline", type: "warning"})
  }

  useEffect(() => {
    window.addEventListener('online', handelConnectionChange)
    window.addEventListener('offline', handelConnectionChange)
    return () => {
      window.removeEventListener('online', handelConnectionChange)
      window.removeEventListener('offline', handelConnectionChange)
    }
  }, [])

  return online
}