export function flattenDoc(doc) {
  return {id: doc.id, ...doc.data()}
}