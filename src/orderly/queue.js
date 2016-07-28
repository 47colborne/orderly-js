import FastPriorityQueue from 'fastpriorityqueue'
import Job from './job'

class Queue {
  constructor({ strategy = this.__defaultStrategy__ } = {}) {
    this.q = new FastPriorityQueue(strategy)
  }

  add(obj) {
    console.info('Orderly.Job.Added')
    if (typeof obj === 'object' && obj.hasOwnProperty('action'))
      return this.q.add(obj)
  }

  get() {
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
