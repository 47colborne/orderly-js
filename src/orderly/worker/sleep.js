import { async } from '../lib'
import start from './start'

function time(worker) {
  return worker.sleep
}

function sleep(worker, next) {
  if (worker.continue)
    worker.next = async(next, time(worker), worker)
  return worker
}

module.exports = sleep
