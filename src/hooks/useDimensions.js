import {useState, useEffect} from "react"

/**
 * Hook that returns the correct window size,
 * even after resize
 */
export default function useDimensions() {
  const {innerHeight, innerWidth} = window

  const [width, setWidth] = useState(innerWidth)
  const [height, setHeight] = useState(innerHeight)

  useEffect(() => {
    const handleResize = () => {
      const {innerHeight, innerWidth} = window
      setWidth(innerWidth)
      setHeight(innerHeight)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return ({width, height})
}