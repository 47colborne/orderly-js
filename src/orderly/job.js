class Job {
  constructor({ action, priority = 0, ...options } = {}) {
    this.action = action
    this.priority = priority
    this.options = options
  }

  execute = (callback) => {
    let r = this.action()

    if (callback && typeof callback === 'function') {
      if ((r && r instanceof Promise)) {
        r.then(callback)
      } else {
        callback(r)
      }
    }

    return r
  }
}

export default Job
