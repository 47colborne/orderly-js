import { isEmpty } from './is_empty'

export function hasJob(queue) {
  return !isEmpty(queue)
}
