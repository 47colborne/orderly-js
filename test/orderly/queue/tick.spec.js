import { assert, expect, sinon, spy, es6Require } from '../../test_helper'

let requireTick = es6Require('orderly/queue/tick')

describe('tick', function() {
  let tick = requireTick()

  context('given an object with counter', function() {
    let object = { counter: 0 }

    it('increases and return counter by 1', function() {
      expect(tick(object)).eq(1)
    })
  })
})
