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


// function Job({ action, priority = 0 } = {}) {
//   let execute = async function(callback)  {
//     let result = await action()
//     if (callback && typeof callback === 'function')
//       callback(result)

//     return result
//   }

//   return { priority, execute }
// }


export default Job
