import FastPriorityQueue from "fastpriorityqueue"
import priorityAndID from "./priorityAndID"

const initHeap = ({ sortBy = priorityAndID }) => {
  return new FastPriorityQueue(sortBy)
}

export default initHeap