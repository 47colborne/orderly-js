export function asyncCall(fun, time, args = []) {
  return setTimeout(fun, time, ...args)
}
