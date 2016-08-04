import FastPriorityQueue from 'fastpriorityqueue'
import { log } from './debug'

function defaultStrategy({ priority: x }, { priority: y }) {
  return y === undefined || x > y
}

class Queue {
  constructor({ strategy = defaultStrategy } = {}) {
    this.queue = new FastPriorityQueue(strategy)
  }

  add(obj) {
    if (typeof obj === 'object' && typeof obj.action === 'function') {
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
