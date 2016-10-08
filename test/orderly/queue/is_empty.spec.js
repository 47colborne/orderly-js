import { assert, expect, sinon, spy, es6Require } from '../../test_helper'

let requireIsEmpty = es6Require('orderly/queue/is_empty')

describe('isEmpty', function() {
  let isEmpty = requireIsEmpty()

  context('when fast priority queue is empty', function() {
    let stub = sinon.stub().returns(true)
    let queue = { q: { isEmpty: stub } }

    it('returns true', function() {
      expect(isEmpty(queue)).eq(true)
    })
  })

  context('when fast priority queue is NOT empty', function() {
    let stub = sinon.stub().returns(false)
    let queue = { q: { isEmpty: stub } }

    it('returns false', function() {
      expect(isEmpty(queue)).eq(false)
    })
  })
})
