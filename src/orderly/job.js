class Job {
  static invoke(job, callback) {
    let q = job.action()

    if (callback && typeof callback === 'function')
      q.then(callback)

    return q
  }

  constructor({ action, priority = 0 }) {
    this.action = action
    this.priority = priority
  }
}

export default Job
