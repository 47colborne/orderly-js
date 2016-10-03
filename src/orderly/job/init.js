import { isFunction } from '../lib'
import { missingExecute } from './error/missing_execute'

export function init(execute, priority = 0) {
  if (!isFunction(execute))
    throw missingExecute

  return { execute, priority }
}
