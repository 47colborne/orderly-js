import { assert, expect, sinon, spy, es6Require } from '../../test_helper'

let increasePending = es6Require('orderly/worker/increase_pending')()

describe('increasePending', function() {
  context('when pending is undefined', function() {
    let worker = {}
    it('sets pending to 1', function() {
      increasePending(worker)
      expect(worker.pending).to.eq(1)
    })
  })

  it('increases pending by 1', function() {
    let worker = { pending: 10 }
    let action = () => increasePending(worker)
    expect(action).to.increase(worker, 'pending')
  })

  it('returns an decrease function', function() {
    let worker = { pending: 10 }
    let decrease = increasePending(worker)
    expect(decrease).to.be.a('function')

  })

  it('decreases pending by 1 when returned function invoked', function() {
    let worker = { pending: 10 }
    let decrease = increasePending(worker)
    expect(decrease).to.decrease(worker, 'pending')
  })
})
