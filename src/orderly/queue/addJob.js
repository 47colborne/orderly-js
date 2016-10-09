export function addJob(queue, job) {
  queue.q.add(job)
  return queue
}
