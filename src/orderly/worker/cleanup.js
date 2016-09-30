import { trim } from '../queue'

function cleanup(worker) {
  trim(worker.queue)
  return worker
}

module.exports = cleanup
