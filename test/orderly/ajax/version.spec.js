import { assert, expect, lib, sinon } from '../../test_helper'

let Version = lib.src('orderly/ajax/version').default

describe('Ajax Version', function() {
  afterEach(function() { Version.map = {} })

  describe('static get', function() {
    context('when the key exists', function() {
      it('returns the value', function() {
        let key = 'key1'
        let value = 'value1'
        Version.map = { [key]: value }
        expect(Version.get(key)).to.eq(value)
      })
    })
    context('when the key does not exist', function() {
      let key = 'key'

      it('returns the default init value', function() {
        let defaultValue = { counter: 0, sent: 0, received: 0 }
        expect(Version.get(key)).to.deep.equal(defaultValue)
      })
      it('add the default init value to the key', function() {
        expect(Version.map[key]).to.not.exist
        Version.get(key)
        expect(Version.map[key]).to.exist
      })
    })
  })

  describe('static inc', function() {
    let key = 'key'

    it('increases the counter for specific key by 1', function() {
      let action = () => Version.inc(key)
      let version = Version.get(key)
      expect(action).to.increase(version, 'counter')
    })

    it('calls Version.get to get the current value', function() {
      let stub = sinon.stub()
      stub.withArgs(key).returns({ counter: 0 })
      let get = Version.get
      Version.get = stub

      Version.inc(key)
      expect(stub).to.have.been.calledOnce
      Version.get = get
    })
  })

  describe('on initialize', function() {
    let key = 'key'
    let version = new Version(key)

    it('assigns an id to the version', function() {
      expect(version.id).to.exist
    })

    it('sets the version check to true by default', function() {
      expect(version.check).to.eq(true)
    })
  })

  // describe('sentIsOutdated', function() {
  //   let key = 'key'

  //   it('returns false when last sent is not greater than own id', function() {
  //     let version = new Version(key)
  //     expect(version.sentIsOutdated()).to.eq(false)
  //   })

  //   it('returns true when last sent is greater than own id', function() {
  //     let version1 = new Version(key)
  //     let version2 = new Version(key)
  //     version2.sent()
  //     expect(version1.sentIsOutdated()).to.eq(true)
  //   })
  // })

  // describe('receivedIsOutdated', function() {
  //   let key = 'key'

  //   it('returns false when last received is not greater than own id', function() {
  //     let version = new Version(key)
  //     expect(version.receivedIsOutdated()).to.eq(false)
  //   })

  //   it('returns true when last received is greater than own id', function() {
  //     let version1 = new Version(key)
  //     let version2 = new Version(key)
  //     version2.received()
  //     expect(version1.receivedIsOutdated()).to.eq(true)
  //   })
  // })

  describe('sent', function() {
    let key = 'key'

    context('when the version sent is not outdated', function() {
      it('sets own id to the map[key].sent', function() {
        let version = new Version(key)
        expect(version.sent).to.increase(Version.map[key], 'sent')
        expect(Version.map[key].sent).to.eq(version.id)
      })
    })

    context('when the version sent is outdated', function() {
      it('does not set own id to the map[key].sent', function() {
        let version1 = new Version(key)
        let version2 = new Version(key)
        version2.sent()
        expect(version1.sent).to.not.change(Version.map[key], 'sent')
      })
    })
  })

  describe('received', function() {
    let key = 'key'

    context('when the version received is not outdated', function() {
      it('sets own id to the map[key].received', function() {
        let version = new Version(key)
        expect(version.received).to.increase(Version.map[key], 'received')
        expect(Version.map[key].received).to.eq(version.id)
      })
    })

    context('when the version received is outdated', function() {
      it('does not set own id to the map[key].received', function() {
        let version1 = new Version(key)
        let version2 = new Version(key)
        version2.received()
        expect(version1.received).to.not.change(Version.map[key], 'received')
      })
    })
  })


})
