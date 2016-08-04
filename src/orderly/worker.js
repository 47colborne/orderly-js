function isFree(pending, max) {
  return pending <= max
}

function hasJob(queue) {
  return !queue.isEmpty()
}

function dispatch(func, ...args) {
  return setTimeout(func, 0, ...args)
}

class Worker {
  constructor(queue, { sleep = 50, max = 8 } = {}) {
    this.pending = 0
    this.continue = true

    this.start(queue, sleep, max)
  }

  start = (queue, sleep, max) => {
    while (this.continue && isFree(this.pending, max) && hasJob(queue)) {
      this.pending += 1
      let job = queue.get()
      dispatch(job.execute, this.complete)
    }

    if (this.continue) {
      queue.cleanup()
      this.setTimeout = setTimeout(this.start, sleep, queue, sleep, max)
    }
  }

  stop() {
    this.continue = false
    clearTimeout(this.setTimeout)
  }

  complete = () => {
    this.pending -= 1
  }
}

export default Worker
