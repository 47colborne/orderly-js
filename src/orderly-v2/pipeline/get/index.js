import error from "../error"
import simpleQueue from "./simpleQueue"
import multiQueue from "./multiQueue"

const get = (queues = []) => {
  if (queues.length === 0)
    throw error.emptyQueue()

  if (queues.length === 1)
    return simpleQueue(queues)

  return multiQueue(queues)
}

export default get