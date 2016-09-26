import Queue from '../queue'

function cleanup(worker) {
  Queue.cleanup(worker.queue)
  return worker
}

module.exports = cleanup
