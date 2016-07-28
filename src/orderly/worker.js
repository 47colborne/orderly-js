import Job from './job'

class Worker {
  constructor(queue, { sleep = 50, max = 8 } = {}) {
    this.queue = queue
    this.sleep = sleep
    this.max = max
    this.pending = 0

    this.start()
  }

  start = () => {
    while (this.available && this.hasJob) {
      this.pending += 1
      let job = this.queue.get()
      this.dispatch(this.execute, job)
    }

    this.queue.cleanup()
    setTimeout(this.start, this.sleep)
  }

  dispatch(func, job) {
    return setTimeout(func, 0, job, this.complete)
  }

  execute = (job) => {
    return Job.invoke(job, this.complete)
  }

  complete = () => {
    this.pending -= 1
  }

  get available() {
    return this.pending < this.max
  }

  get hasJob() {
    return !this.queue.isEmpty()
  }
}

export default Worker
