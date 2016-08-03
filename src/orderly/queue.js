import FastPriorityQueue from 'fastpriorityqueue'
import { log } from '../debug'

function defaultStrategy({ priority: x }, { priority: y }) {
  return x !== undefined && x > y
}

class Queue {
  constructor({ strategy = defaultStrategy, debug } = {}) {
    this.queue = new FastPriorityQueue(strategy)
    this.debug = debug
  }

  add(obj) {
    if (typeof obj === 'object' && typeof obj.action === 'function') {
      return this.queue.add(obj)
    }
  }

  get() {
    log('Queue', 'get', `size: ${ this.size }`)
    return this.queue.poll()
  }

  isEmpty() {
    return this.queue.isEmpty()
  }

  get size() {
    return this.queue.size
  }

  cleanup() {
    return this.queue.trim()
  }
}

export default Queue
