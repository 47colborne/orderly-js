import { assert, expect, sinon, spy, es6Require } from '../../test_helper'

let requireAddJob = es6Require('orderly/queue/addJob')

describe('addJob', function() {
  let addJob = requireAddJob()

  it('adds a job into the queue', function() {
    let spy = sinon.spy()
    let job = {}
    let queue = { q: { add: spy }, counter: 0 }

    queue = addJob(queue, job)
    expect(spy.withArgs(sinon.match(job))).calledOnce
  })

  it('returns the queue', function() {
    let job = {}
    let queue = { q: { add: o => o }, counter: 0 }

    expect(addJob(queue, job)).to.eq(queue)
  })
})

