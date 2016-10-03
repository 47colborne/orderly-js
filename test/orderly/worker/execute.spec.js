import { assert, expect, sinon, stub } from '../../test_helper'

let stubExecute = stub('orderly/worker/execute', {
  '../lib': { asyncCall: () => {} },
  '../job': { run: () => {} }
})

describe('execute', function() {
  it('invokes the job asynchronously', function() {
    let spy = sinon.spy()
    let run = () => { }
    let args = [1,2,3]

    let execute = stubExecute({
      lib: { asyncCall: spy },
      job: { run: run }
    })

    execute(args)
    expect(spy.withArgs(run, 0, args)).calledOnce
  })
})
