class Version {

  static map = {}

  static get = function(key) {
    return this.map[key] || (this.map[key] = { counter: 0, sent: 0, received: 0 })
  }

  static inc = function(key) {
    return this.get(key).counter += 1
  }

  static isOutdated(version, action) {
    return version.check && this.get(version.key)[action] > version.id
  }

  static sent(version) {
    let record = this.get(version.key)
    if (version.id > record.sent) {
      return record.sent = version.id
    }
  }

  static received(version) {
    let record = this.get(version.key)
    if (version.id > record.received) {
      return record.received = version.id
    }
  }

  constructor(key, check = true) {
    this.check = check
    this.key = key
    this.id = Version.inc(key)
  }

  sent = () => {
    return Version.sent(this)
  }

  received = () => {
    return Version.received(this)
  }
}

export default Version
