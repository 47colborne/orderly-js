import { assert, expect, lib, sinon } from '../test_helper'

let Job = lib.src('orderly/job')

describe('Job', function() {
  let executable = () => { }

  describe('init', function() {
    it('returns a job with executable function', function() {
      let job = Job.init(executable, 0)
      expect(job.execute).to.eq(executable)
    })

    it('returns a job with priority', function() {
      let job = Job.init(executable, 10)
      expect(job.priority).to.eq(10)
    })

    context('given no priority', function() {
      it('returns a job with priority 0', function() {
        let job = Job.init(executable)
        expect(job.priority).to.eq(0)
      })
    })

    context('given no executable function', function() {
      it('throws error', function() {
        expect(() => { Job.init() }).to.throw(TypeError)
      })
    })
  })
})
