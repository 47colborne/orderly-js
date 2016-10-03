// import { assert, expect, lib, sinon } from '../../test_helper'

// let Version = lib.src('orderly/ajax/version').default

// describe('Ajax Version', function() {
//   let key = 'key'

//   afterEach(function() { Version.map = {} })

//   describe('static get', function() {
//     context('when the key exists', function() {
//       it('returns the value', function() {
//         let value = 'value1'
//         Version.map = { [key]: value }
//         expect(Version.get(key)).to.eq(value)
//       })
//     })

//     context('when the key does not exist', function() {
//       it('returns the default init value', function() {
//         let defaultValue = { counter: 0, sent: 0, received: 0 }
//         expect(Version.get(key)).to.deep.equal(defaultValue)
//       })

//       it('add the default init value to the key', function() {
//         expect(Version.map[key]).to.not.exist
//         Version.get(key)
//         expect(Version.map[key]).to.exist
//       })
//     })
//   })

//   describe('static inc', function() {
//     it('increases the counter for specific key by 1', function() {
//       let action = () => Version.inc(key)
//       let version = Version.get(key)
//       expect(action).to.increase(version, 'counter')
//     })

//     it('calls Version.get to get the current value', function() {
//       let stub = sinon.stub()
//       stub.withArgs(key).returns({ counter: 0 })
//       let get = Version.get
//       Version.get = stub

//       Version.inc(key)
//       expect(stub).to.have.been.calledOnce
//       Version.get = get
//     })
//   })

//   describe('initialize', function() {
//     context('when options is set to false', function() {
//       let options = false
//       let version = new Version(key, options)

//       it('toggles check to false', function() {
//         expect(version.check).to.eq(false)
//       })
//     })

//     context('when options name is set', function() {
//       let options = { name: 'version group' }
//       let version = new Version(key, options)

//       it('sets version key to the name', function() {
//         expect(version.key).to.eq(options.name)
//       })
//     })

//     context('when options filterParam is set to true', function() {
//       let key = 'http://www.example.com?name=test&desp=test'
//       let options = { filterParams: true }
//       let version = new Version(key, options)

//       it('filters url params and use it as the key', function() {
//         expect(version.key).to.eq('http://www.example.com')
//       })
//     })

//     context('by default', function() {
//       let key = 'http://www.example.com?name=test&desp=test'
//       let version = new Version(key, undefined)

//       it('checks and use the original key', function() {
//         expect(version.key).to.eq(key)
//         expect(version.check).to.eq(true)
//       })
//     })
//   })

//   describe('sent', function() {
//     let version = new Version(key, undefined)

//     it('calls Version.sent and pass self', function() {
//       sinon.spy(Version, 'sent')
//       version.sent()
//       expect(Version.sent).has.been.calledWith(version)
//     })
//   })

//   describe('received', function() {
//     let version = new Version(key, undefined)

//     it('calls Version.received and pass self', function() {
//       sinon.spy(Version, 'received')
//       version.received()
//       expect(Version.received).has.been.calledWith(version)
//     })
//   })
// })
