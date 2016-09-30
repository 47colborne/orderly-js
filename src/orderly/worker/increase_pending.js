function increasePending(worker) {
  worker.pending = (worker.pending || 0) + 1
  return function() { worker.pending -= 1 }
}

module.exports = increasePending
