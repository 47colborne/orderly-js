function run(job, ...args) {
  return job.execute.apply(null, args)
}

module.exports = run
