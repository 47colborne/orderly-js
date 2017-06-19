import add from "./add"
import empty from "./empty"
import get from "./get"
import initHeap from "./initHeap"
import trim from "./trim"

const create = (opts = {}) => {
  let heap = initHeap(opts)

  return {...opts,
    heap,
    add: add(heap, opts),
    get: get(heap, opts),
    empty: empty(heap, opts),
    trim: trim(heap, opts)
  }
}

export default { create }
