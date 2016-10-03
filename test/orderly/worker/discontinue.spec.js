import { assert, expect, sinon, spy, stub } from '../../test_helper'

let discontinue = stub('orderly/worker/discontinue')()

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
