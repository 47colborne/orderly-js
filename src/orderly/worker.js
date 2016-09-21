import Queue from './queue'

class Worker {
  constructor(queue, { sleep = 32, max = 8 } = {}) {
    this.queue = queue
    this.sleep = sleep
    this.max = max

    this.pending = 0
    this.continue = true
  }

  start = () => {
    while (this.pending < this.max && !Queue.isEmpty(this.queue)) {
      this.pending += 1
      let job = Queue.get(this.queue)

      setTimeout(job.execute, 0, this.complete)
    }

    Queue.cleanup(this.queue)

    if (this.continue)
      this.setTimeout = setTimeout(this.start, this.sleep)
  }

  stop() {
    this.continue = false
    clearTimeout(this.setTimeout)
  }

  complete = () => {
    console.log('COMPLETED')
    this.pending -= 1
  }
}

export default Worker
