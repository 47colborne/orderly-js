import { isFunction } from '../lib'
import missingExecute from './error/missing_execute'

function init(execute, priority = 0) {
  if (!isFunction(execute))
    throw missingExecute

  return { execute, priority }
}

module.exports = init
