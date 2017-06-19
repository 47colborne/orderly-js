import { truthy } from "./function"

const not = (fn) => {
  return (arg) => !fn(arg)
}

const all = (...fns) => {
  return fns.reduce((acc, fn) => {
    return (...args) => acc(...args) && fn(...args)
  }, truthy)
}

const exists = (arg) => arg != undefined

const notExist = not(exists)

export { not, all, exists, notExist }