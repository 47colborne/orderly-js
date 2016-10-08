import { assert, expect, sinon, spy, es6Require } from '../../test_helper'

let requireCompare = es6Require('orderly/queue/compare')

describe('comapre', function() {
  let compare = requireCompare()

  context('when priorities are the same', function() {
    context('and x.id is less than y.id', function() {
      it('returns true to indicate items are ordered', function() {
        let x = { priority: 0, queueId: 1 }
        let y = { priority: 0, queueId: 2 }

        expect(compare(x, y)).eq(true)
      })
    })
    context('and x.id is greater or equal to y.id', function() {
      it('returns false to indicate items are not ordered', function() {
        let x = { priority: 0, queueId: 2 }
        let y = { priority: 0, queueId: 1 }

        expect(compare(x, y)).eq(false)
      })
    })
  })

  context('when priorities are different', function() {
    context('and x.priority is less than y.priority', function() {
      it('returns false to indicate items are not ordered', function() {
        let x = { priority: 1 }
        let y = { priority: 2 }

        expect(compare(x, y)).eq(false)
      })
    })
    context('and x.priority is greater or equal to y.priority', function() {
      it('returns true to indicate items are ordered', function() {
        let x = { priority: 2 }
        let y = { priority: 1 }

        expect(compare(x, y)).eq(true)
      })
    })
  })
})
