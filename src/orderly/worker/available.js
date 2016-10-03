import { lessThan } from '../lib'

export function available(worker) {
  return lessThan(worker.pending, worker.max)
}
