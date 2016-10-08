import { isFunction } from './is_function'

export function pipe(fn, ...args) {
  let result = isFunction(fn) ? fn.apply(null, args) : fn
  let pipe = buildNextPipe(result)
  let end = buildEnd(result)
  return { fn, result, pipe, end }
}

function buildNextPipe(result) {
  return function(fn, ...args) {
    args.unshift(result)
    args.unshift(fn)
    return pipe.apply(null, args)
  }
}

function buildEnd(result) {
  return function() {
    return result
  }
}
