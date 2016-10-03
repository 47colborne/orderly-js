import { assert, expect, sinon, spy, stub } from '../../test_helper'

let stubStart = stub('/orderly/worker/start', {
  cleanup: './cleanup',
  poll: './poll',
  sleep: './sleep'
})

describe('start', function() {
  let worker = {}

  it('polls', function() {
    let spy = sinon.spy()
    let start = stubStart({
      cleanup: o => o,
      sleep: o => o,
      poll: spy
    })

    start(worker)
    expect(spy.withArgs(worker)).calledOnce
  })

  it('cleans up after poll', function() {
    let spy = sinon.spy()
    let start = stubStart({
      poll: o => o,
      sleep: o => o,
      cleanup: spy
    })

    start(worker)
    expect(spy.withArgs(worker)).calledOnce
  })

  it('sleeps after clean up', function() {
    let spy = sinon.spy()
    let start = stubStart({
      cleanup: o => o,
      poll: o => o,
      sleep: spy
    })

    start(worker)
    expect(spy.withArgs(worker)).calledOnce
  })
})
