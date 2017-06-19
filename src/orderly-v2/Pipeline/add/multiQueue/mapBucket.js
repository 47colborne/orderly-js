import { truthy } from "../../../helpers/function"

const mapBucket = ({ bucket = truthy, add }) => {
  return task => {
    let fallInBucket = bucket(task)

    if (fallInBucket)
      add(task)

    return fallInBucket
  }
}

export default mapBucket