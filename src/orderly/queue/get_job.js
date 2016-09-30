import { log } from '../debug'

function logAction(queue) {
  log('Queue', 'getting a job', { size: queue.q.size })
}

function getJob(queue) {
  logAction(queue)
  return queue.q.poll()
}

module.exports = getJob
