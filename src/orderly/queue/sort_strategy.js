import { sortedByID } from './sorted_by_id'
import { sortedByPriority } from './sorted_by_priority'
export function sortStrategy(x, y) {
  return sortedByID(x, y) || sortedByPriority(x, y)
}
