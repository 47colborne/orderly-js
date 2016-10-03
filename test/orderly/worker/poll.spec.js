import { assert, expect, sinon, spy, stub } from '../../test_helper'

function toggleBoolean(bool, times = 1) {
  let counter = 0
  let returned = bool
  return function() {
    counter += 1
    if (counter > times) returned = !bool
    return returned
  }
}

let stubPoll = stub('orderly/worker/poll', {
  available: './available',
  execute: './execute',
  hasJob: '../queue',
  getJob: '../queue',
  increasePending: './increase_pending'
})

describe('poll', function() {
  let worker = { pending: 0 }
  let poll = stubPoll({
        available: toggleBoolean(true),
        hasJob: toggleBoolean(true),
        getJob: (o) => o
      })

  it('returns the worker', function() {

    expect(poll(worker)).to.eq(worker)
  })

  context('when worker is busy', function() {
    let poll = stubPoll({
      available: toggleBoolean(false),
      hasJob: toggleBoolean(true)
    })

    it('skips the process', function() {
      let action = () => poll(worker)
      expect(action).to.not.increases(worker, 'pending')
    })
  })

  context('when queue is empty', function() {
    let poll = stubPoll({
      available: toggleBoolean(true),
      hasJob: toggleBoolean(false)
    })

    it('skips the process', function() {
      let action = () => poll(worker)
      expect(action).to.not.increases(worker, 'pending')
    })
  })

  context('when queue has job and worker is available', function() {
    let job = {}
    let spy = sinon.spy()
    let poll = stubPoll({
      available: toggleBoolean(true),
      execute: spy,
      hasJob: toggleBoolean(true),
      getJob: (o) => job
    })

    it('increases pending', function() {
      let action = () => poll(worker)
      expect(action).to.increases(worker, 'pending')
    })

    it('calls execute with job and decrease pending', function() {
      let args = [job, sinon.match.func]
      poll(worker)
      expect(spy.withArgs(args)).to.have.been.calledOnce
    })
  })
})
