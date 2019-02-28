export function flattenDoc(doc) {
  return {id: doc.key, ...doc.data()}
}