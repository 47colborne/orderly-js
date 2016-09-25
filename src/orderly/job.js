function init(execute, priority = 0) {
  if (typeof execute !== 'function')
    throw new TypeError('First argument in Job.init must an function')

  return { execute, priority }
}

function execute(job, ...args) {
  return job.execute.apply(null, args)
}

function valid(job) {
  return typeof job === 'object' && typeof job.execute === 'function'
}

function validates(job) {
  if (!valid(job)) throw new TypeError('Job must contain execute function')
}

export default { init, execute, valid, validates }
