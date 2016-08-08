import FastPriorityQueue from 'fastpriorityqueue'
import { log } from './debug'

function defaultStrategy(
  { priority: p1 = 0, queueId: qId1 },
  { priority: p2 = 0, queueId: qId2 }
) {

  return p2 < p1 || qId2 > qId1
}

class Queue {
  static counter = 0

  static inc = function() {
    return this.counter += 1
  }

  constructor({ strategy = defaultStrategy } = {}) {
    this.queue = new FastPriorityQueue(strategy)
  }

  add(obj) {
    if (typeof obj === 'object' && typeof obj.execute === 'function') {
      obj.order = Queue.inc()
      this.queue.add(obj)
      return obj
    } else {
      throw new Error('trying to insert an invalid job', obj)
    }
  }

  get() {
    log('Queue', 'getting a job', { size: this.size() })
    return this.queue.poll()
  }

  isEmpty() {
    return this.queue.isEmpty()
  }

  size() {
    return this.queue.size
  }

  cleanup() {
    return this.queue.trim()
  }
}

export default Queue
