import { assert, expect, lib, sinon } from '../test_helper'

let Queue = lib.src('orderly/queue').default

describe('Queue', function() {

  function stubJob(priority, execute = () => {}) {
    return { priority, execute }
  }

  let queue = new Queue()
  beforeEach(function() { queue = new Queue })

  describe('#add', function() {
    it('accepts a job with action', function() {
      expect(() => queue.add(stubJob())).to.increase(queue.queue, 'size')
    })

    it('returns the job', function() {
      let job = stubJob()
      expect(queue.add(job)).to.eq(job)
    })

    it('thorws an error if invalid job is inserted', function() {
      expect(() => queue.add('invalid job')).to.throw(Error)
    })
  })

  describe('#get', function() {
    it('behaves like FIFO queue with same priority', function() {
      let job1 = stubJob(0)
      let job2 = stubJob(0)
      let job3 = stubJob(0)
      let job4 = stubJob(0)

      queue.add(job1)
      queue.add(job2)
      queue.add(job3)
      queue.add(job4)

      expect(queue.get()).to.eq(job1)
      expect(queue.get()).to.eq(job2)
      expect(queue.get()).to.eq(job3)
      expect(queue.get()).to.eq(job4)
    })

    it('returns a job with any priority first', function() {
      let noPriorityJob = stubJob(undefined)
      let highPriorityJob = stubJob(10)
      queue.add(noPriorityJob)
      queue.add(highPriorityJob)

      expect(queue.get()).to.eq(highPriorityJob)
    })

    it('returns a job with highest priority first', function() {
      let lowPriorityJob = stubJob(1)
      let highPriorityJob = stubJob(10)
      queue.add(lowPriorityJob)
      queue.add(highPriorityJob)

      expect(queue.get()).to.eq(highPriorityJob)
    })

    context('when queue is empty', function() {
      it('returns undefined', function() {
        expect(queue.isEmpty()).to.eq(true)
        expect(queue.get()).to.eq(undefined)
      })
    })
  })

  describe('#isEmpty', function() {
    it('returns true when queue is empty', function() {
      expect(queue.isEmpty()).to.eq(true)
    })

    it('returns false when queue is not empty', function() {
      queue.add(stubJob())
      expect(queue.isEmpty()).to.eq(false)
    })
  })

  describe('#size', function() {
    it('should the length of the job', function() {
      let size = Math.floor(Math.random() * 10 + 1)
      let jobs = new Array(size)
        .fill(undefined)
        .forEach(() => queue.add(stubJob()))

      expect(queue.size()).to.eq(size)
    })
  })

  describe('#cleanup', function() {
    it('should trigger FastPriorityQueue#trim', function() {
      queue.queue.trim = sinon.spy()
      queue.cleanup()
      expect(queue.queue.trim).to.have.been.called
    })
  })
})
