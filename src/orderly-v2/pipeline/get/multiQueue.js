import { all, not, notExist } from "../../helpers/condition"
import { apply, identity, falsy, truthy } from "../../helpers/function"
import { rem } from "../../helpers/math"
import { lessThanUsing } from "../../helpers/operator"
import { getOr } from "../../helpers/object"

const getWeight = getOr('weight', 1)

const filter = ({ empty, get, weight = 1 }) => {
  return { empty, get, weight }
}

const initialize = (queue, index) => {
  return {...filter(queue), current: 0, id: index}
}

const empty = (queue) => {
  return queue.empty()
}

const maxed = (queue) => {
  return queue.current >= queue.weight
}

const reset = (queue) => {
  return queue.current = rem(queue.current, queue.weight)
}

const notEmpty = not(empty)
const notMaxed = not(maxed)
const qualified = all(notMaxed, notEmpty)

const getter = (queues) => {
  const queue = queues.find(qualified)

  if (notExist(queue)) {
    queues.map(reset)
    return getter(queues)
  }

  queue.current += 1
  return queue.get()
}

const multiQueue = (queues) => {
  queues = queues
    .sort(lessThanUsing(getWeight))
    .map(initialize)

  return () => getter(queues)
}

export default multiQueue

