import {useState} from "react"

/**
 * @typedef {Object} UseListMutationsDefault
 * @property {'desc'|'asc'} order
 * @property {string} orderBy
 * @property {string} query
 *
 * Hook that makes it easy to mutate lists.
 * You can filter (query) or sort a list on element properties
 * @param {array} list list to mutate
 * @defauls {UseListMutationsDefault} [defaults={}] default order, order property, and query
 */
export default (list, defaults={}) => {
  const [order, setOrder] = useState(defaults.order || "desc")
  const [orderBy, setOrderBy] = useState(defaults.orderBy || "")
  const [query, setQuery] = useState(defaults.query || "")

  return ({
    order,
    orderBy,
    query,
    handleRequestSort: orderBy => {
      setOrder(order === "desc" ? "asc" : "desc")
      setOrderBy(orderBy)
    },
    handleQuery: ({target: {value}}) => setQuery(value.toLowerCase()),
    list: stableSort(list, getSorting(order, orderBy))
      .filter(m => query === "" || (m && m.TM && m.TM.toLowerCase() === query)) // TODO: Make it possible to pass filterable arguments through this hook.
  })
}


const desc = (a, b, orderBy) => (b[orderBy] < a[orderBy]) ? -1 : (b[orderBy] > a[orderBy]) ? 1 : 0

const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

const getSorting = (order, orderBy) => (a, b) => (order === 'desc' || -1) * desc(a, b, orderBy)