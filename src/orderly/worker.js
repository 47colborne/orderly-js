class Worker {
  constructor(queue, { sleep = 50, max = 8 } = {}) {
    this.queue = queue
    this.sleep = sleep
    this.max = max

    this.pending = 0
    this.continue = true
  }

  start = () => {
    while (this.pending <= this.max && !this.queue.isEmpty()) {
      this.pending += 1
      let job = this.queue.get()

      setTimeout(job.execute, 0, this.complete)
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
