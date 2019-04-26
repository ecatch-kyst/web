/**
 * Set the preferred theme
 */
export function init() {
    const firstTimeLogin = true
    firstTimeLogin !== null && this.setState({firstTimeLogin})
    localStorage.setItem("firstTimeLogin", firstTimeLogin)
  }
  
  
  /**
   * Toggles the dark mode
   */
  export function toggle() {
    console.log("HH")
    const firstTimeLogin = false
    localStorage.setItem("firstTimeLogin", firstTimeLogin)
    this.setState({firstTimeLogin})
  }