let async = require('../lib/async')
let run = require('../job/run')

function execute(args = []) {
  async(run, 0, args)
}

module.exports = execute
