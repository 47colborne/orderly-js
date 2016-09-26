import Job from '../job'
import Queue from '../queue'

import { async, lessThan } from '../lib'

function waitingJob(worker) {
  return !Queue.isEmpty(worker.queue)
}

function enoughCapacity(worker) {
  return lessThan(worker.pending, worker.max)
}

function retrieveJob(worker) {
  return Queue.get(worker.queue)
}

function onNextJob(worker, action) {
  while(enoughCapacity(worker) && waitingJob(worker)) {
    action(retrieveJob(worker))
  }
}

function increasePending(worker) {
  worker.pending += 1
  return function() { worker.pending -= 1 }
}

function poll(worker) {
  onNextJob(worker, function(job) {
    let decreasePending = increasePending(worker)
    async(Job.run, 0, job, decreasePending)
  })
  return worker
}

module.exports = poll
