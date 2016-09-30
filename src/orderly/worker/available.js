import { lessThan } from '../lib'

function available(worker) {
  return lessThan(worker.pending, worker.max)
}

module.exports = available
