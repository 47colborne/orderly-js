import mapBucket from "./mapBucket"

const mapBuckets = (prev, queue) => {
  const next = mapBucket(queue)
  return task => prev(task) || next(task)
}

export default mapBuckets