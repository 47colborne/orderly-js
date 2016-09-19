import { filterParams } from './url'

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

  constructor(url, options = {}) {
    this.check = options !== false
    this.key = options.name || (options.filterParams ? filterParams(url) : url)
    this.id = Version.inc(this.key)
  }

  sent = () => Version.sent(this)

  received = () => Version.received(this)
}

export default Version
