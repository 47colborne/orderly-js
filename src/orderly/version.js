function initValue() {
  return { counter: 0, current: 0 }
}

class Version {

  static map = {}

  static get = function(key) {
    return this.map[key] || (this.map[key] = initValue())
  }

  static inc = function(key) {
    return this.get(key).counter += 1
  }

  constructor(key, willOutdated) {
    this.willOutdated = willOutdated !== undefined ? willOutdated : true
    this.key = key
    this.id = Version.inc(key)
  }

  isOutdated = () => {
    return this.willOutdated && Version.get(this.key).current > this.id
  }

  setAsCurrent = () => {
    let versionForKey = Version.get(this.key)
    if (versionForKey.current < this.id) {
      return versionForKey.current = this.id
    }

    debugger
  }
}

// class VersionTracker {
//   constructor() {
//     this.initValue = 0
//     this.map = {}
//   }

//   get(key) {
//     return this.map[key] || (this.map[key] = { counter: 0, current: 0 })
//   }

//   getCounter(key) {
//     return this.get(key).counter
//   }

//   getCurrent(key) {
//     return this.get(key).current
//   }

//   setCurrent(key, val) {
//     return this.get(key).current = val
//   }

//   inc(key) {
//     return (this.map[key] || (this.map[key] = this.get(key))).counter += 1
//   }
// }

export default Version
