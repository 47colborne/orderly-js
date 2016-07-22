let increment = (int) => {
  return int + 1
}

let decrement = (int) => {
  return int - 1
}

let start = (queue, options) => {
  let { sleep, max } = __defaults__(options)
  return setInterval(__run__(queue, max), sleep)
}

let stop = (worker) => {
  return clearInterval(worker)
}

let __defaults__ = (options = {}) => {
  return { sleep: 50, max: 8, ...options}
}

let __run__ = (queue, max) => {
  let pending = 0

  return () => {
    while (pending < max && !queue.isEmpty()) {
      pending = increment(pending)

      let job = queue.get()
      let q = job.run()

      q.then(() => {
        pending = decrement(pending)
      })
    }
    queue.cleanup()
  }
}

export default { start, stop }
