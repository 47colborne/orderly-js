import { notExist } from "../../../helpers/condition"

import qualified from "./qualified"
import reset from "./reset"

const get = (queues) => {
  const queue = queues.find(qualified)

  if (notExist(queue)) {
    queues.map(reset)
    return get(queues)
  }

  queue.current += 1
  return queue.get()
}

export default get