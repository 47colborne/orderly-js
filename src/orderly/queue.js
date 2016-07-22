import FastPriorityQueue from 'fastpriorityqueue'

class Queue {
  constructor(options = {}) {
    let { strategy = this.__defaultStrategy__ } = options
    this.q = new FastPriorityQueue(strategy)
  }

  add(job) {
    if (typeof job === 'object') return this.q.add(job)
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
