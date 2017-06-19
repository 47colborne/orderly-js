import { falsy } from "../../../helpers/boolean"

import mapBuckets from "./mapBuckets"

const multiQueue = (queues) => {
  const mapper = queues.reduce(mapBuckets, falsy)
  return (...tasks) => tasks.map(mapper)
}

export default multiQueue