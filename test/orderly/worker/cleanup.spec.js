import { assert, expect, sinon, stub } from '../../test_helper'

let stubCleanup = stub('orderly/worker/cleanup', {
  '../queue': {
    trim: (obj) => obj
  }
})

describe('cleanup', function() {
  it('trims worker queue', function() {
    let spy = sinon.spy()
    let cleanup = stubCleanup({ queue: { trim: spy } })

    let queue = {}
    let worker = { queue }

    cleanup(worker)
    expect(spy.withArgs(queue)).calledOnce
  })

  it('returns the worker', function() {
    let cleanup = stubCleanup()
    let queue = {}
    let worker = { queue }

    expect(cleanup(worker)).to.eq(worker)
  })
})
