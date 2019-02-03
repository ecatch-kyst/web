/**
 * Toggles the dark mode
 */
export default function toggleDarkMode() {
  this.setState(({isDarkMode}) => ({isDarkMode: !isDarkMode}))
}