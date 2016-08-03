import { log } from '../debug'

class Job {
  constructor({ action, priority = 0, ...options } = {}) {
    this.action = action
    this.priority = priority
    this.options = options

    log('Job', 'constructed', this)
  }

  async execute(callback) {
    log('Job', 'executing', this)

    let result = await this.action()
    if (callback && typeof callback === 'function') {
      callback(result)
    }

    return result
  }
}

export default Job
