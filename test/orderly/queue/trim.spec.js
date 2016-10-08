import { assert, expect, sinon, spy, es6Require } from '../../test_helper'

let requireTrim = es6Require('orderly/queue/trim')

describe('trim', function() {
  let trim = requireTrim()

  context('given an object with q', function() {
    let spy = sinon.spy()
    let object = { q: { trim: spy } }

    it('calls trim on internal q', function() {
      trim(object)
      expect(spy).calledOnce
    })
  })
})
