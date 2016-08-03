function initValue() {
  return { counter: 0, sent: 0, received: 0 }
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

  keyIsOyutdated(key) {
    return this.willOutdated && Version.get(this.key)[key] > this.id
  }

  sentIsOutdated = () => {
    return this.keyIsOyutdated('sent')
  }

  receivedIsOutdated = () => {
    return this.keyIsOyutdated('received')
  }

  sent = () => {
    let versionForKey = Version.get(this.key)
    if (versionForKey.sent < this.id) {
      return versionForKey.sent = this.id
    }
  }

  received = () => {
    let versionForKey = Version.get(this.key)
    if (versionForKey.received < this.id) {
      return versionForKey.received = this.id
    }
  }
}

export default Version
