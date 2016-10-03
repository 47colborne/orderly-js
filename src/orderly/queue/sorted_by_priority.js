import { priority } from '../job'
import { lessThan } from '../lib'

export function sortedByPriority(x, y) {
  return lessThan(priority(y), priority(x))
}
