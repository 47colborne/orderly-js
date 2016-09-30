import { assert, expect, lib, sinon, spy } from '../../test_helper'

function stubStop({
  clearNext = (worker) => worker,
  discontinue = (worker) => worker
} = {}) {
  return lib.src('/orderly/worker/stop', {
    './clear_next': clearNext,
    './discontinue': discontinue
  })
}

describe('stop', function() {
  let worker = {}

  it('clears next scheduled worker job', function() {
    let spy = sinon.spy()
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
