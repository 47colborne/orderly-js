function async(fun, time, args = []) {
  return setTimeout(fun, time, ...args)
}

module.exports = async
