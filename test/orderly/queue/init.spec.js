import { assert, expect, sinon, spy, es6Require } from '../../test_helper'

import FastPriorityQueue from 'fastpriorityqueue'

let requireInit = es6Require('orderly/queue/init', { compare: './compare' })

describe('init', function() {
  let compare = sinon.stub()
  let init = requireInit({ compare })

  it('returns the queue with property q set', function() {
    let { q } = init()
    expect(q).instanceof(FastPriorityQueue)
  })

  it('uses compare with FastPriorityQueue', function() {
    let { q: { compare } } = init()
    expect(compare).eq(compare)
  })

  it('returns a new queue with counter default to 0', function() {
    let { counter } = init()
    expect(counter).eq(0)
  })
})
