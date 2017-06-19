import { getOr } from "../../../helpers/object"
import { lessThanUsing } from "../../../helpers/operator"

import get from "./get"
import initialize from "./initialize"

const getWeight = getOr('weight', 1)

const multiQueue = (queues) => {
  queues = queues
    .sort(lessThanUsing(getWeight))
    .map(initialize)

  return () => get(queues)
}

export default multiQueue

