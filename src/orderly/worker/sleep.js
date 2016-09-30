import { async } from '../lib'

function sleep(worker, next) {
  if (worker.continue)
    worker.next = async(next, worker.sleep, [worker])
  return worker
}

module.exports = sleep
