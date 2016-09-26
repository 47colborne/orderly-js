import Job from './job'
import Queue from './queue'

import { async, pipe } from './lib'

function lessThan(x, y) {
  return x < y
}

function hasJob(queue) {
  return !Queue.isEmpty(queue)
}

function onNextJob({ pending, max, queue }, callback) {
  while(lessThan(pending, max) && hasJob(queue)) {
    let job = Queue.get(queue)
    callback.call(null, job)
  }
}

function increasePending(worker) {
  worker.pending += 1
  return function() { worker.pending -= 1 }
}


function poll(worker) {
  onNextJob(worker, function(job) {
    let decreasePending = increasePending(worker)
    async(Job.execute, 0, job, decreasePending)
  })
  return worker
}

function cleanup(worker) {
  Queue.cleanup(worker.queue)
  return worker
}

function sleep(worker) {
  if (worker.continue)
    worker.next = async(start, worker.sleep, worker)
  return worker
}

function clearNext(worker) {
  worker.next = clearTimeout(worker.next)
  return worker
}

function discontinue(worker) {
  worker.continue = false
  return worker
}

// PUBLIC INTERFACE
// ==============================================

function init(queue, { sleep = 32, max = 8 } = {}) {
  return {
    queue, sleep, max,
    pending: 0,
    continue: true
  }
}

let start = pipe(poll, cleanup, sleep)
let stop = pipe(clearNext, discontinue)

export default { init, start, stop }
