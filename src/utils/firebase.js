
/**
 * Takes a Firestore document snapshot, and returns the
 * data from it as a plain Object, with the id appended to it.
 * @param {DocumentSnapshot} doc
 */
export function flattenDoc(doc) {
  return {id: doc.id, ...doc.data()}
}