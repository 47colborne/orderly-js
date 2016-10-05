import { assert, expect, sinon, spy, es6Require } from '../../test_helper'

let requireGetJob = es6Require('orderly/queue/get_job')

describe('getJob', function() {
  let getJob = requireGetJob()

  it('polls job from the internal lib', function() {
    let spy = sinon.spy()
    let queue = { q: { poll: spy } }

    getJob(queue)
    expect(spy).calledOnce
  })

  it('returns the job polled', function() {
    let job = {}
    let stub = sinon.stub().returns(job)
    let queue = { q: { poll: stub } }

    expect(getJob(queue)).to.eq(job)
  })
})

