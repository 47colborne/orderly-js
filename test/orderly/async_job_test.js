import { assert, expect, lib, sinon } from '../test_helper'

let AsyncJob = lib.src('orderly/async_job')

describe('AsyncJob', function() {

  describe('initialize', function() {
    let action = () => {}

    it('should accept an action', function() {
      let job = new AsyncJob({ action })
      expect(job.action).to.equal(action)
    })

    it('should accept an priority', function() {
      let priority = Math.round(Math.random() * 10, 0)
      let job = new AsyncJob({ action, priority })
      expect(job.priority).to.equal(priority)
    })
  })

  describe('run', function() {
    let action = sinon.spy()

    it('should invoke the action', function() {
      let job = new AsyncJob({ action })
      job.run()
      expect(action).to.be.calledOnce
    })
  })
})
