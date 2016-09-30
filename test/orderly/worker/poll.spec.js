import { assert, expect, lib, sinon, spy } from '../../test_helper'

function toggleBoolean(bool, times = 1) {
  let counter = 0
  let returned = bool
  return function() {
    counter += 1
    if (counter > times) returned = !bool
    return returned
  }
}

function stubPoll({
  available = toggleBoolean(true),
  execute = () => undefined,
  hasJob = toggleBoolean(true),
  getJob = () => {}
} = {}) {
  let options = {
    './available': available,
    './execute': execute,
    '../queue': {
      hasJob: hasJob,
      getJob: getJob
    }
  }

  return lib.src('orderly/worker/poll', options)
}

describe('poll', function() {
  let worker = { pending: 0 }

  it('returns the worker', function() {
    let poll = stubPoll()
    expect(poll(worker)).to.eq(worker)
  })

  context('when worker is busy', function() {
    let poll = stubPoll({
      available: (worker) => false
    })

    it('skips the process', function() {
      let action = () => poll(worker)
      expect(action).to.not.increases(worker, 'pending')
    })
  })

  context('when queue is empty', function() {
    let poll = stubPoll({
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
    let poll = stubPoll({ execute: spy, getJob: () => job })

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
