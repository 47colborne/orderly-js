import { assert, expect, lib, sinon } from '../test_helper'

let Job = lib.src('orderly/job')

describe('Job', function() {

  describe('static invoke', function() {
    let action = sinon.spy()

    it('should invoke the given job', function() {
      let job = new Job({ action })
      Job.invoke(job)
      expect(action).to.be.calledOnce
    })
  })

  describe('initialize', function() {
    let action = () => {}

    it('should accept an action', function() {
      let job = new Job({ action })
      expect(job.action).to.equal(action)
    })

    it('should accept an priority', function() {
      let priority = Math.round(Math.random() * 10, 0)
      let job = new Job({ action, priority })
      expect(job.priority).to.equal(priority)
    })
  })
})
