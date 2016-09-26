import FastPriorityQueue from 'fastpriorityqueue'
import Job from './job'
import { log } from './debug'

function defaultStrategy(
  { priority: p1 = 0, queueId: qId1 },
  { priority: p2 = 0, queueId: qId2 }
) {
  return (p1 === p2 && qId2 > qId1) || (p2 < p1)
}

function generateID(queue) {
  return queue.counter += 1
}

function init() {
  return { q: new FastPriorityQueue(defaultStrategy), counter: 0 }
}

function add(queue, job) {
  job.queueId = generateID(queue)
  queue.q.add(job)
  return job
}

function get(queue) {
  log('Queue', 'getting a job', { size: queue.q.size })
  return queue.q.poll()
}

function isEmpty(queue) {
  return queue.q.isEmpty()
}

function size(queue) {
  return queue.q.size
}

function cleanup(queue) {
  return queue.q.trim()
}

export default { init, add, get, isEmpty, size, cleanup }
