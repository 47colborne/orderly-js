import { assert, expect, lib, sinon, spy } from '../../test_helper'

let clearNext = lib.src('orderly/worker/clear_next')

describe('clearNext', function() {
  it('tries to clear next scheduled worker call', function() {
    spy(global, 'clearTimeout', function(spy) {
      let next = sinon.stub()
      let worker = { next }
      clearNext(worker)
      expect(spy).to.have.been.calledWith(next)
    })
  })

  it('returns a new worker', function() {
    let next = sinon.stub()
    let worker = { next }
    expect(clearNext(worker)).to.eq(worker)
  })
})
