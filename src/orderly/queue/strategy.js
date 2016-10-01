import { equal, lessThan } from '../lib'
import { id, priority } from '../job'

function fifoStrategy(x, y) {
  return equal(priority(x), priority(y)) && lessThan(id(x), id(y))
}

function priorityStrategy(x, y) {
  return lessThan(priority(y), priority(x))
}

function strategy(x, y) {
  return fifoStrategy(x, y) || priorityStrategy(x, y)
}

module.exports = strategy
