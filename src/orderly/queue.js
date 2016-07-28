import FastPriorityQueue from 'fastpriorityqueue'
import Job from './job'

class Queue {
  constructor({ strategy = this.__defaultStrategy__, debug } = {}) {
    this.q = new FastPriorityQueue(strategy)
    this.debug = debug
  }

  add(obj) {
    if (typeof obj === 'object' && obj.hasOwnProperty('action')) {
      return this.q.add(obj)
    }
  }

  get() {
    if (this.debug) console.info('Orderly.Queue size: ', this.size())
    return this.q.poll()
  }

  isEmpty() {
    return this.q.isEmpty()
  }

  size() {
    return this.q.size
  }

  cleanup() {
    return this.q.trim()
  }

  __defaultStrategy__({ priority: x }, { priority: y }) {
    return x !== undefined && x > y
  }
}

export default Queue
