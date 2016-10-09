import { isEmpty } from './isEmpty'

export function hasJob(queue) {
  return !isEmpty(queue)
}
