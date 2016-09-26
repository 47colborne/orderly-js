import FastPriorityQueue from 'fastpriorityqueue'
import strategy from './strategy'

function init() {
  return {
    q: new FastPriorityQueue(strategy),
    counter: 0
  }
}

module.exports = init
