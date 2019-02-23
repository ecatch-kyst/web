/**
 * Submit a users own fishingspot to store //TODO: send to firebase
 * @param {int} value
 * @param {string} name
 * @param {string} longitude
 * @param {string} latitude
 */
export function addSpot(){
  const {editing} = this.state.custom
  this.setState(({custom}) => ({
    custom: {
      ...custom,
      fishingspots: [
        ...custom.fishingspots,
        editing
      ]
    }
  }))
  this.notify({name: "addSpot", type: "success"})
}

export function handle({target: {name, value}}) {
  this.setState(({custom}) => ({
    custom: {
      ...custom,
      editing: {
        ...custom.editing,
        [name]: value
      }
    }
  }))
}