const id = (obj) => {
  return obj.id
}

const priority = (obj) => {
  return obj.priority
}

const priorityAndID = (x, y) => {
  return [priority(y), id(x)] < [priority(x), id(y)]
}

export default priorityAndID