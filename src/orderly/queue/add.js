function ensurePriority({ priority = 0 }) {
  return priority
}

function generateID(queue) {
  return queue.counter += 1
}

function add(queue, job) {
  job.priority = ensurePriority(job)
  job.queueId = generateID(queue)

  queue.q.add(job)
  return job
}

module.exports = add
