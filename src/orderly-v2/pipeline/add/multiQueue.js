import mapBuckets from "./mapBuckets"

import { falsy } from "../../helpers/boolean"

const multiQueue = (queues) => {
  const mapper = queues.reduce(mapBuckets, falsy)
  return (...tasks) => tasks.map(mapper)
}

export default multiQueue