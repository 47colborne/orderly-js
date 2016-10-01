import { priority } from '../job'
import generateID from './generate_id'

function add(queue, job) {
  job.queueId = generateID(queue)
  job.priority = priority(job)
  queue.q.add(job)
  return job
}

module.exports = add
