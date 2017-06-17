import { truthy } from "../../helpers/boolean"

const mapBucket = ({ bucket = truthy, heap }) => {
  return task => {
    let fallInBucket = bucket(task)

    if (fallInBucket)
      heap.add(task)

    return fallInBucket
  }
}

export default mapBucket