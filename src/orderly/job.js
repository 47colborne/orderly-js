class Job {
  static counter = 0;

  static invoke(job, callback) {
    let q = job.run()

    if (callback && typeof callback === 'function')
      q.then(callback)

    return q
  }

  log(job, action) {
    let { id, priority } = job
    console.info(`Orderly.Job: ${action}, id:${id}, priority:${priority}`)
  }

  constructor({ action, priority = 0, debug }) {
    this.id = (Job.counter += 1)
    this.action = action
    this.priority = priority
    this.debug = debug

    this.log(this, 'Constructed')
  }

  run() {
    if (this.debug) this.log(this, 'Invoking')
    return this.action()
  }
}

export default Job
