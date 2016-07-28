class VersionTracker {
  constructor() {
    this.initValue = 0
    this.map = {}
  }

  get(key) {
    return this.map[key] || this.initValue
  }

  set(key, value) {
    return this.map[key] = value
  }

  inc(key) {
    return this.set(key, this.get(key) + 1)
  }
}

export default VersionTracker