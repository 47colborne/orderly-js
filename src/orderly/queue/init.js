import FastPriorityQueue from 'fastpriorityqueue'
import { compare } from './compare'

export function init() {
  let q = new FastPriorityQueue(compare)
  return { q }
}
