import { assert, expect, sinon, spy, stub } from '../../test_helper'

let available = stub('orderly/worker/available')()

describe('available', function() {
  context('when pending jobs is less than max', function() {
    let worker = { pending: 10, max: 20 }

    it('returns true', function() {
      expect(available(worker)).to.eq(true)
    })
  })
  context('when pending jobs reached the max', function() {
    let worker = { pending: 20, max: 20 }

    it('returns false', function() {
      expect(available(worker)).to.eq(false)
    })
  })
})
