class Job {
  static counter = 0

  static async invoke(job, callback) {
    if (this.debug) this.log(job, 'Invoking')

    let result = await job.action()

    if (callback && typeof callback === 'function')
      result = callback(result)

    return result
  }

  static log(job, action) {
    let { id, priority } = job
    console.info(`Orderly.Job: ${action}, id:${id}, priority:${priority}`)
  }

  constructor({ action, priority = 0 }) {
    this.id = (Job.counter += 1)
    this.action = action
    this.priority = priority

    if(Job.debug) Job.log(this, 'Constructed')
  }
}

export default Job
