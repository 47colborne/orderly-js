import { hasJob, getJob } from '../queue'
import { available } from './available'
import { execute } from './execute'
import { increasePending } from './increasePending'

export function poll(worker) {
  let queue = worker.queue
  while (available(worker) && hasJob(queue)) {
    let job = getJob(queue)
    let decreasePending = increasePending(worker)
    execute([job, decreasePending])
  }

  return worker
}
