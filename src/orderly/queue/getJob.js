export function getJob(queue) {
  return queue.q.poll()
}
