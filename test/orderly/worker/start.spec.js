import { assert, expect, lib, sinon, spy } from '../../test_helper'

function stubStart({
  cleanup = (worker) => worker,
  poll = (worker) => worker,
  sleep = (worker) => worker
} = {}) {
  return lib.src('/orderly/worker/start', {
    './cleanup': cleanup,
    './poll': poll,
    './sleep': sleep
  })
}

describe('start', function() {
  let worker = {}

  it('polls', function() {
    let spy = sinon.spy()
    let start = stubStart({ poll: spy })

    start(worker)
    expect(spy.withArgs(worker)).calledOnce
  })

  it('cleans up after poll', function() {
    let spy = sinon.spy()
    let start = stubStart({ cleanup: spy })

    start(worker)
    expect(spy.withArgs(worker)).calledOnce
  })

  it('sleeps after clean up', function() {
    let spy = sinon.spy()
    let start = stubStart({ sleep: spy })

    start(worker)
    expect(spy.withArgs(worker)).calledOnce
  })
})
