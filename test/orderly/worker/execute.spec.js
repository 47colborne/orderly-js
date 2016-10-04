import { assert, expect, sinon, es6Require } from '../../test_helper'

let stubExecute = es6Require('orderly/worker/execute', {
  asyncCall: '../lib',
  run: '../job'
})

describe('execute', function() {
  it('invokes the job asynchronously', function() {

    let spy = sinon.spy()
    let run = () => { }
    let args = [1,2,3]

    let execute = stubExecute({
      asyncCall: spy,
      run: run
    })

    execute(args)
    expect(spy.withArgs(run, 0, args)).calledOnce
  })
})
