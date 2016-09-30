import { assert, expect, lib, sinon, spy } from '../../test_helper'

let init = lib.src('orderly/worker/init')

describe('init', function() {
  context('when queue is not give', function() {
    it('raises TypeError', function() {
      expect(init).to.throw(TypeError)
    })
  })

  it('returns an worker object with queue', function() {
    let queue = "queue"
    let worker = init(queue)
    expect(worker.queue).to.eq(queue)
  })

  it('returns an worker object with given sleep', function() {
    let sleep = 9
    let worker = init({}, { sleep })
    expect(worker.sleep).to.eq(sleep)
  })

  it('returns an worker object with given max', function() {
    let max = 10
    let worker = init({}, { max })
    expect(worker.max).to.eq(max)
  })

  context('when sleep is not given', function() {
    it('returns an worker object with default sleep 32', function() {
      let worker = init({})
      expect(worker.sleep).to.eq(32)
    })
  })

  context('when max is not given', function() {
    it('returns an worker object with default max 8', function() {
      let worker = init({})
      expect(worker.max).to.eq(8)
    })
  })

  it('returns an worker object with pending 0', function() {
    let worker = init({})
    expect(worker.pending).to.eq(0)
  })

  it('returns an worker object with continue true', function() {
    let worker = init({})
    expect(worker.continue).to.eq(true)
  })

})
