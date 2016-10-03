import { clearNext } from './clear_next'
import { discontinue } from './discontinue'

export function stop(worker) {
  return discontinue(clearNext(worker))
}
