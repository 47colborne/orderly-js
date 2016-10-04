import { assert, expect, sinon, spy, es6Require } from '../../test_helper'

let discontinue = es6Require('orderly/worker/discontinue')()

describe('discontinue', function() {
  it('toggles the continue to false', function() {
    let worker = { continue: true }
    discontinue(worker)
    expect(worker.continue).to.eq(false)
  })

  it('returns the worker', function() {
    let worker = { continue: true }
    expect(discontinue(worker)).to.eq(worker)
  })
})
