class Job {
  constructor({ action, priority = 0, ...options } = {}) {
    this.action = action
    this.priority = priority
    this.options = options
  }

  execute = async (callback) => {
    let result = await this.action()
    if (callback && typeof callback === 'function') {
      callback(result)
    }

    return result
  }
}

export default Job
