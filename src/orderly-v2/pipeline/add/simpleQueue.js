const simpleQueue = ([queue]) => {
  return (...tasks) => tasks.map(queue.heap.add)
}

export default simpleQueue