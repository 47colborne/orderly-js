import { assert, expect, sinon, spy, es6Require } from '../../test_helper'

let stubSleep = es6Require('/orderly/worker/sleep', {
  asyncCall: '../lib'
})

describe('sleep', function() {
  let next = 'next'
  let time = 99

  it('returns the worker', function() {
    let sleep = stubSleep()
    let worker = {}
    expect(sleep(worker)).to.eq(worker)
  })

  context('when worker is set to continue', function() {
    let worker = { continue: true, sleep: time  }
    let returned = 'returned'
    let spy = sinon.stub().returns(returned)
    let sleep = stubSleep({ asyncCall: spy })

    it('schedules next worker job', function() {
      let args = [next, time, [worker]]
      sleep(worker, next)
      expect(spy.withArgs(...args)).to.have.been.calledOnce
    })

    it('assigns async function returned value to next', function() {
      sleep(worker, next)
      expect(worker.next).to.eq(returned)
    })
  })

  context('when worker is set to discontinue', function() {
    let worker = { continue: false  }
    let spy = sinon.stub()
    let sleep = stubSleep({ asyncCall: spy })

    it('does not schedules next worker job', function() {
      sleep(worker, next)
      expect(spy).to.not.have.been.called
      expect(worker.next).to.be.undefined
    })
  })
})
