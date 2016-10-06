import { assert, expect, sinon, spy, es6Require } from '../../test_helper'

let requireHasJob = es6Require('orderly/queue/has_job', {
  isEmpty: './is_empty'
})

describe('hasJob', function() {
  let queue = {}
  context('given a queue with job', function() {
    let isEmpty = () => false
    let hasJob = requireHasJob({ isEmpty })

    it('returns true', function() {
      expect(hasJob(queue)).to.eq(true)
    })
  })

  context('given an empty queue', function() {
    let isEmpty = () => true
    let hasJob = requireHasJob({ isEmpty })

    it('returns false', function() {
      expect(hasJob(queue)).to.eq(false)
    })
  })
})