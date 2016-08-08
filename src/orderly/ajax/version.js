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

  constructor(key, check = true) {
    this.check = check
    this.key = key
    this.id = Version.inc(key)
  }

  sentIsOutdated = () => {
    return this.check && Version.get(this.key)['sent'] > this.id
  }

  receivedIsOutdated = () => {
    return this.check && Version.get(this.key)['received'] > this.id
  }

  sent = () => {
    let versionForKey = Version.get(this.key)
    if (this.id > versionForKey.sent) {
      return versionForKey.sent = this.id
    }
  }

  received = () => {
    let versionForKey = Version.get(this.key)
    if (this.id > versionForKey.received) {
      return versionForKey.received = this.id
    }
  }
}

export default Version
