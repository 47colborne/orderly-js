import clearNext from './clear_next'
import discontinue from './discontinue'

function stop(worker) {
  return discontinue(clearNext(worker))
}

module.exports = stop
