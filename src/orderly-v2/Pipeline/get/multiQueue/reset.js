import { rem } from "../../../helpers/math"

const reset = (queue) => {
  return queue.current = rem(queue.current, queue.weight)
}

export default reset