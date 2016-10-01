function generateID(queue) {
  return queue.counter += 1
}

module.exports = generateID
