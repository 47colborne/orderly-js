import cleanup from './cleanup'
import poll from './poll'
import sleep from './sleep'

function start(worker) {
  return sleep(cleanup(poll(worker)), start)
}

module.exports = start
