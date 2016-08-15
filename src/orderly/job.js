function initExecute(execute) {
  return function(callback) {
    let r = execute()

    if (typeof callback === 'function') {
      if (r instanceof Promise) {
        return r.then(callback)
      } else {
        return callback(r)
      }
    }

    return r
  }
}

class Job {
  constructor(execute , priority = 0) {
    this.execute = initExecute(execute)
    this.priority = priority
  }
}

export default Job
