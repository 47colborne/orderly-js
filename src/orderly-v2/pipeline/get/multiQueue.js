import { falsy, truthy } from "../../helpers/boolean"

// const is = (type) => {
//   return (value) => typeof value === type
// }

// const isNumber = is("number")

const getOr = (key, defaultValue) => {
  return (obj) => obj[key] || defaultValue
}

const getWeight = getOr('weight', 1)

const lessThan = (fn) => {
  return (x, y) => fn(x) < fn(y)
}

// const tick = ({current, ...state}) => {
//   return {...state, current: current + 1}
// }

// const reset = () => {
//   return {current: 0}
// }

// const increase = ({current}) => {
//   return {current: current + 1}
// }

// const reachedMax = (state) => {
//   return state.current == (state.max() - 1)
// }

// const either = (lhs, rhs, condition) => {
//   return (...args) => {
//     return condition.apply(null, args) ?
//       lhs.apply(null, args) :
//       rhs.apply(null, args)
//   }
// }

// const reached = (limit) => {
//   return (value) => value >= limit
// }

// const mapWeight = (queue, index) => {
//   const localStore = queue.store

//   return (globalState) => {
//     const localState = localStore.get()
//     const max = localState.max()
//     const current = localState.current

//     if (queue.empty()) {
//       return
//     }

//     if (current >= queue.weight) {
//       return
//     }

//     localStore.set(increase)

//     return queue.get()
//   }
// }

// const mapWeights = (prev, queue, index) => {
//   const next = mapWeight(queue, index)

//   return (state) => prev(state) || next(state)
// }

// const getter = (globalStore, selector) => {
//   const globalState = globalStore.get()
//   const task = selector(globalState)
//   console.log(task)
//   if (task != undefined) {


//     if (globalState.current >= globalState.max() - 1) {
//       globalStore.reset()
//     } else {
//       globalStore.set(increase)
//     }

//   } else {
//     globalStore.reset()
//   }

//   return task
// }



// const initStore = (state = {}) => {
//   const get = () => state
//   const set = (fn) => (
//     state = {...state, ...fn(state)}
//   )

//   return { get, set }
// }

// const initGlobalState = () => {
//   return {
//     current: 0,
//     max: () => 0
//   }
// }

// const initLocalStore = (store) => {
//   store.reset = () => store.set(reset)

//   return (queue) => {
//     const {max, reset} = store.get()

//     const localMax = () => (
//       queue.empty() ? null : max() + queue.weight
//     )

//     const globalMax = () => (
//       max() + (queue.empty() ? 0 : queue.weight)
//     )

//     const localStore = initStore({
//       current: 0,
//       max: localMax
//     })

//     store.set(state => ({...state,
//       max: globalMax,
//       reset: () => reset() && localStore.set(reset)
//     }))

//     return {...queue, store: localStore }
//   }
// }

// const filterQueue = ({ empty, get, weight = 1 }, id) => {
//   return {empty, get, weight, id}
// }

// const multiQueue = (queues) => {
//   let globalStore = initStore(initGlobalState())

//   const selector = queues
//     .sort(lessThan(getWeight))
//     .map(filterQueue)
//     .map(initLocalStore(globalStore))
//     .reduce(mapWeights, falsy)

//   return () => getter(globalStore, selector)
// }

// export default multiQueue

const initialize = ({ empty, get, weight = 1}, id) => {
  return {
    current: 0,
    empty,
    get,
    id,
    weight
  }
}

const assignID = (queue, id) => {
  return {...queue, id}
}

const identity = (arg) => arg

const apply = (fn, args) => {
  return fn.apply(null, args)
}

const compose = (...fns) => {
  return fns.reduceRight((acc, fn) => (
    (arg) => fn(acc(arg))
  ), identity)
}

const not = (fn) => {
  return (arg) => !fn(arg)
}

const empty = (queue) => {
  return queue.empty()
}

const maxed = (queue) => {
  return queue.current >= queue.weight
}

const all = (...fns) => {
  return fns.reduce((acc, fn) => {
    return (...args) => acc(...args) && fn(...args)
  }, truthy)
}

const reset = (queue) => {
  return queue.current = 0
}

const getter = (queues) => {
  const queue = queues.find(all(not(maxed), not(empty)))


  if (!queue) {
    queues.map(reset)
    return getter(queues)
  }

  queue.current += 1

  return queue.get()
}

const multiQueue = (queues) => {
  queues = queues
    .sort(lessThan(getWeight))
    .map(initialize)

  // console.log(getter(queues))

  return () => getter(queues)

}

export default multiQueue

