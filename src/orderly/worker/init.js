function init(queue, { sleep = 32, max = 8 } = {}) {
  return {
    queue, sleep, max,
    pending: 0,
    continue: true
  }
}

module.exports = init
