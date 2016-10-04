import { assert, expect, sinon, spy, es6Require } from '../../test_helper'

let stubAddJob = es6Require('orderly/queue/add_job')

describe('addJob', function() {
  let addJob = stubAddJob()

  it('adds a job into the queue', function() {
    let spy = sinon.spy()
    let job = {}
    let queue = { q: { add: spy }, counter: 0 }

    addJob(queue, job)

    expect(spy.withArgs(sinon.match(job))).calledOnce
  })

  it('generates an id for job', function() {
    let spy = sinon.spy()
    let job = {}
    let queue = { q: { add: spy }, counter: 0 }

    queue = addJob(queue, job)
    console.log(queue)
    expect(spy.withArgs(sinon.match.has('queueId', 2)))
  })

  it('ensures priority in job is default to 0', function() {
    let job = {}
    let queue = { q: { add: o => o }, counter: 0 }

    addJob(queue, job)
    expect(job.priority).to.eq(0)
  })

  it('returns the queue', function() {
    let job = {}
    let queue = { q: { add: o => o }, counter: 0 }

    expect(addJob(queue, job)).to.eq(queue)
  })
})

