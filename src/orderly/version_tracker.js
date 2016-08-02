class VersionTracker {
  constructor() {
    this.initValue = 0
    this.map = {}
  }

  get(key) {
    return this.map[key] || (this.map[key] = { counter: 0, current: 0 })
  }

  getCounter(key) {
    return this.get(key).counter
  }

  getCurrent(key) {
    return this.get(key).current
  }

  setCurrent(key, val) {
    return this.get(key).current = val
  }

  inc(key) {
    return (this.map[key] || (this.map[key] = this.get(key))).counter += 1
  }
}

export default VersionTracker