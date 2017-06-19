import { truthy } from "../../../helpers/boolean"

const mapBucket = ({ bucket = truthy, add }) => {
  return task => {
    let fallInBucket = bucket(task)

    if (fallInBucket)
      add(task)

    return fallInBucket
  }
}

export default mapBucket