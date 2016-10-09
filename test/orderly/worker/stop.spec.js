import { assert, expect, sinon, spy, es6Require } from '../../test_helper'

let stubStop = es6Require('orderly/worker/stop', {
  clearNext: './clearNext',
  discontinue: './discontinue'
})

describe('stop', function() {
  let worker = {}

  it('clears next scheduled worker job', function() {
    let spy = sinon.stub().returns(worker)
    let stop = stubStop({ clearNext: spy })
    stop(worker)
    expect(spy.withArgs(worker)).calledOnce
  })

  it('discontinues', function() {
    let spy = sinon.spy()
    let stop = stubStop({ discontinue: spy })
    stop(worker)
    expect(spy.withArgs(worker)).calledOnce
  })

  it('returns the worker', function() {
    let stop = stubStop()
    expect(stop(worker)).to.eq(worker)
  })
})
