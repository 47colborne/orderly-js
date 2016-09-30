import { run } from '../job'
import { hasJob, getJob } from '../queue'
import available from './available'
import execute from './execute'
import increasePending from './increase_pending'

function poll(worker) {
  let queue = worker.queue
  while (available(worker) && hasJob(queue)) {
    let job = getJob(queue)
    let decreasePending = increasePending(worker)
    execute([job, decreasePending])
  }

  return worker
}

module.exports = poll
