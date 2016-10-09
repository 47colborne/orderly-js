import { isFunction } from '../lib'
import { initCounter } from './initCounter'

let ticker = initCounter()

export function init(execute, priority = 0) {
  return { execute, priority, id: ticker() }
}
