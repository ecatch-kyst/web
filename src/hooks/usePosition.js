import {useState, useEffect, useContext, useRef} from "react"
import Store from "../db"
import {GEOPOINT} from "../lib/firebase"

/**
 * Hook that returns the user's current GPS position,
 * responsive to position changes.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
 */
export default function usePosition() {
  const [position, setPosition] = useState(GEOPOINT(0,0))
  const {notify} = useContext(Store)
  const id = useRef()

  useEffect(() => {
    id.current = navigator.geolocation.watchPosition(({coords: {latitude, longitude}}) => {
      setPosition(GEOPOINT(latitude || 0, longitude || 0))
    }, error => {
      notify({name: "position", type: "error", message: error.message})
    })
    return () => navigator.geolocation.clearWatch(id.current)
  }, [])

  return position
}