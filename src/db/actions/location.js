import {GEOPOINT} from "../../lib/firebase"

/**
 * Subscribe to the user's position
 */
export function subscribe() {
  if ("geolocation" in navigator ) {
    this.locationId = navigator.geolocation.watchPosition(({coords: {latitude, longitude}}) => {
      this.setState({position: GEOPOINT(latitude, longitude)})
    }, ({code, message}) => this.notify({name: "position", type: "error", message: `${code}: ${message}`}), {enableHighAccuracy: true})
  }
}


/**
 * Unsubscribe from the user's position
 */
export function unsubscribe() {
  if("geolocation" in navigator) {
    navigator.geolocation.clearWatch(this.locationId)
    this.locationId = undefined
  }
}

/**
 * Get the user's position
 */
export function get() {
  if ("geolocation" in navigator ) {
    this.locationId = navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
      this.setState({position: GEOPOINT(latitude, longitude)})
    }, () => this.notify({name: "position", type: "error"}))
  }
}
