const apply = (...args) => {
  return fn.apply(null, args)
}

const compose = (...fns) => {
  return fns.reduceRight((acc, fn) => (
    (arg) => fn(acc(arg))
  ), identity)
}

const identity = (arg) => arg

const truthy = () => true

const falsy = () => false

export { apply, compose, identity, truthy, falsy }