import { assert, expect, lib, sinon } from '../test_helper'

let Queue = lib.src('orderly/queue')

describe('Queue', function() {

  describe('initialize', function() {
    let insertJobs = (q, ...jobs) => jobs.forEach(j => q.add(j))
    let expectJobs = (q, ...jobs) => jobs.forEach(j => expect(q.get()).to.include(j))

    it('should run with default priority strategy', function() {
      let queue = new Queue

      insertJobs(queue, { priority: 6 }, { priority: 3 }, { priority: 9 })
      expectJobs(queue, { priority: 9 }, { priority: 6 }, { priority: 3 })
    })

    it('accepts an strategy function', function() {
      let strategy = (x, y) => x.p < y.p
      let queue = new Queue({ strategy })

      insertJobs(queue, { p: 1 }, { p: 3 }, { p: 2 })
      expectJobs(queue, { p: 1 }, { p: 2 }, { p: 3 })
    })
  })

  describe('add', function() {
    let queue = new Queue()

    context('when trying to add an valid job', function() {
      let job = {}

      it('should add a job into the queue', function() {
        expect(() => queue.add(job)).to.increase(queue.q, 'size')
      })
    })

    context('when trying to add an invalid job', function() {
      let job = "invalid job"

      it('should not add to the queue', function() {
        expect(() => queue.add(job)).to.not.change(queue.q, 'size')
      })
    })
  })

  describe('get', function() {
    let queue = new Queue()
    afterEach(function() { queue = new Queue() })

    context('when queue is not empty', function() {
      let job = { description: "Test Job" }
      beforeEach(function() { queue.add(job) })

      it('should return the job', function() {
        expect(queue.get()).to.equal(job)
      })
    })

    context('when queue is empty', function() {
      it('should return undefined', function() {
        expect(queue.get()).to.equal(undefined)
      })
    })
  })

  describe('isEmpty', function() {
    let queue = new Queue
    afterEach(function() { queue = new Queue() })

    it('should return true when queue is empty', function() {
      expect(queue.isEmpty()).to.equal(true)
    })
    it('should return false when queue is not empty', function() {
      queue.add({})
      expect(queue.isEmpty()).to.equal(false)
    })
  })
})
