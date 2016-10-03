import { trim } from '../queue'

export function cleanup(worker) {
  trim(worker.queue)
  return worker
}

