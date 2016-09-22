import Queue from './queue'

function executeJobs(worker) {
  while (worker.pending < worker.max && !Queue.isEmpty(worker.queue)) {
    worker.pending += 1
    let job = Queue.get(worker.queue)
    setTimeout(job.execute, 0, () => { worker.pending -= 1 })
  }
  return worker
}

function cleanup(worker) {
  Queue.cleanup(worker.queue)
  return worker
}

function sleep(worker, sleep) {
  if (worker.continue)
    worker.setTimeout = setTimeout(start, sleep, worker)
  return worker
}

function init(queue, { sleep = 32, max = 8 } = {}) {
  return { queue, sleep, max,
    pending: 0,
    continue: true
  }
}

function start(worker) {
  return sleep(cleanup(executeJobs(worker)), worker.sleep)
}

function stop(worker) {
  worker.setTimeout = clearTimeout(worker.setTimeout)
  worker.continue = false
  return worker
}

export default { init, start, stop }
