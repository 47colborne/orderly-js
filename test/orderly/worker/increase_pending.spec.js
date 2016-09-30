import { assert, expect, lib, sinon, spy } from '../../test_helper'

let incrasePending = lib.src('orderly/worker/increase_pending')

describe('incrasePending', function() {
  context('when pending is undefined', function() {
    let worker = {}
    it('sets pending to 1', function() {
      incrasePending(worker)
      expect(worker.pending).to.eq(1)
    })
  })

  it('increases pending by 1', function() {
    let worker = { pending: 10 }
    let action = () => incrasePending(worker)
    expect(action).to.increase(worker, 'pending')
  })

  it('returns an decrease function', function() {
    let worker = { pending: 10 }
    let decrease = incrasePending(worker)
    expect(decrease).to.be.a('function')

  })

  it('decreases pending by 1 when returned function invoked', function() {
    let worker = { pending: 10 }
    let decrease = incrasePending(worker)
    expect(decrease).to.decrease(worker, 'pending')
  })
})
