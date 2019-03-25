import {useContext} from "react"
import Store from "../db/Store"

/**
 * Hook that returns the global store
 */
export default function useStore() {
  return useContext(Store)
}