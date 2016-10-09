import { clearNext } from './clearNext'
import { discontinue } from './discontinue'

export function stop(worker) {
  return discontinue(clearNext(worker))
}
