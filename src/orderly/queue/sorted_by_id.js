import { id, priority } from '../job'
import { equal, lessThan } from '../lib'

export function sortedByID(x, y) {
  return (
    equal(priority(x), priority(y)) &&
    lessThan(id(x), id(y))
  )
}
