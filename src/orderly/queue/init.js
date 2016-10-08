import FastPriorityQueue from 'fastpriorityqueue'
import { compare } from './compare'

export function init() {
  let q = new FastPriorityQueue(compare)
  let counter = 0
  return { q, counter }
}
