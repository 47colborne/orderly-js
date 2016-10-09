import { assert, expect, sinon, spy, es6Require } from '../../test_helper'

let clearNext = es6Require('orderly/worker/clearNext')()

describe('clearNext', function() {
  it('tries to clear next scheduled worker call', function() {
    spy(global, 'clearTimeout', function(spy) {
      let next = sinon.stub()
      let worker = { next }
      clearNext(worker)
      expect(spy.withArgs(next)).called
    })
  })

  it('returns a new worker', function() {
    let next = sinon.stub()
    let worker = { next }
    expect(clearNext(worker)).to.eq(worker)
  })
})
