function pipe(subject, callbacks = []) {
  return callbacks.reduce(function(output, callback) {
    return callback(output)
  }, subject)
}

module.exports = pipe
