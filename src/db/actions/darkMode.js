/**
 * Set the preferred theme
 */
export function init() {
  const isDarkMode = JSON.parse(localStorage.getItem("isDarkMode"))
  isDarkMode !== null && this.setState({isDarkMode})
}


/**
 * Toggles the dark mode
 */
export function toggle() {
  const isDarkMode = !this.state.isDarkMode
  if (isDarkMode) {
    this.notify({name: "darkMode.on", duration: 600})
  } else {
    this.notify({name: "darkMode.off", duration: 600})
  }
  localStorage.setItem("isDarkMode", isDarkMode)
  this.setState({isDarkMode})
}