import { isFunction, isObject } from './lib'

function executeIsRequired() {
  return new TypeError('First argument in Job.init must an function')
}

function init(execute, priority = 0) {
  if (!isFunction(execute))
    throw executeIsRequired()

  return { execute, priority }
}

function execute(job, ...args) {
  return job.execute.apply(null, args)
}

export default { init, execute }
