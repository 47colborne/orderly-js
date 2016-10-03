import FastPriorityQueue from 'fastpriorityqueue'
import { sortStrategy } from './sort_strategy'

export function init() {
  return {
    q: new FastPriorityQueue(sortStrategy),
    counter: 0
  }
}
