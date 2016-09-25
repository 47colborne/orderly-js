function async(callback, time, ...args) {
  return setTimeout(callback, time, ...args)
}

module.exports = async
