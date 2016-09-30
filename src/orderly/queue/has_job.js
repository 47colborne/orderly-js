let isEmpty = require('./is_empty')

function hasJob(queue) {
  return !isEmpty(queue)
}

module.exports = hasJob
