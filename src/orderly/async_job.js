class AsyncJob {
  constructor({ action, priority = 0 }) {
    this.action = action
    this.priority = priority
  }

  run() {
    return this.action()
  }
}

export default AsyncJob
