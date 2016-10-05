import { priority } from '../job'
import { tick } from './tick'

export function addJob(queue, job) {
  job.queueId = queue.counter = tick(queue)
  job.priority = priority(job)
  queue.q.add(job)
  return queue
}
