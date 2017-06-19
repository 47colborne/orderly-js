import filter from "./filter"

const initialize = (queue, index) => {
  return {...filter(queue), current: 0, id: index}
}

export default initialize