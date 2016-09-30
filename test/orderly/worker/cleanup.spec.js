import { assert, expect, lib, sinon } from '../../test_helper'

let stubQueue = {}

let cleanup = lib.src('orderly/worker/cleanup', {
  '../queue': stubQueue
})

describe('cleanup', function() {
  it('trims worker queue', function() {
    let queue = {}
    let worker = { queue }

    stubQueue.trim = sinon.spy()
    cleanup(worker)
    expect(stubQueue.trim).to.have.been.calledWith(queue)
  })

  it('returns the worker', function() {
    let queue = {}
    let worker = { queue }

    expect(cleanup(worker)).to.eq(worker)
  })
})
