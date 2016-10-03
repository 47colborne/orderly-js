import { assert, expect, sinon, stub } from '../../test_helper'

let stubCleanup = stub('orderly/worker/cleanup', {
  trim: '../queue'
})

describe('cleanup', function() {
  it('trims worker queue', function() {
    let spy = sinon.spy()
    let queue = {}
    let worker = { queue }

    let cleanup = stubCleanup({ trim: spy })

    cleanup(worker)
    expect(spy.withArgs(queue)).calledOnce
  })

  it('returns the worker', function() {
    let queue = {}
    let worker = { queue }
    let cleanup = stubCleanup({ trim: (o) => o })
    expect(cleanup(worker)).to.eq(worker)
  })
})
