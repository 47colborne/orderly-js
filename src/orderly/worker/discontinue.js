function discontinue(worker) {
  worker.continue = false
  return worker
}

module.exports = discontinue
