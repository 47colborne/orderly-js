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
    this.queue = queue
    this.sleep = sleep
    this.max = max

    this.pending = 0
    this.continue = true
  }

  start = () => {
    while (isFree(this.pending, this.max) && hasJob(this.queue)) {
      this.pending += 1
      let job = this.queue.get()

      dispatch(job.execute, this.complete)
    }

    this.queue.cleanup()

    if (this.continue)
      this.setTimeout = setTimeout(this.start, this.sleep)
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
