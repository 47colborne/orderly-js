import { priority } from '../job'
import { tick } from './tick'

export function addJob(queue, job) {
  queue = { ...queue, counter: tick(queue) }
  queue.q.add({ ...job,
    queueId: queue.counter,
    priority: priority(job)
  })
  return queue
}
