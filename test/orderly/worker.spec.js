import { assert, expect, lib, sinon, spy } from '../test_helper'

let Job = lib.src('orderly/job').default
let Queue = lib.src('orderly/queue').default
let Worker = lib.src('orderly/worker').default

describe('Worker', function() {

  beforeEach(function() {
    this.clock = sinon.useFakeTimers()
  })

  afterEach(function() {
    this.clock.restore()
  })

  describe('init', function() {
    let queue = Queue.init()
    let options = { sleep: 100, max: 10 }
    let worker = Worker.init(queue, options)

    it('returns an object with queue', function() {
      expect(worker.queue).to.eq(queue)
    })

    it('returns an object with sleep time', function() {
      expect(worker.sleep).to.eq(options.sleep)
    })

    it('returns an object with max', function() {
      expect(worker.max).to.eq(options.max)
    })

    context('given no sleep time', function() {
      let worker = Worker.init(queue)

      it('returns an object with default sleep time', function() {
        expect(worker.sleep).to.eq(32)
      })
    })

    context('given no max', function() {
      let worker = Worker.init(queue)

      it('returns an object with default max', function() {
        expect(worker.max).to.eq(8)
      })
    })
  })

  describe('start', function() {
    let job1 = Job.init(sinon.spy(), 1)
    let job2 = Job.init(sinon.spy(), 1)
    let queue = Queue.init()
    let worker = Worker.init(queue)
    beforeEach(function() {
      Queue.add(queue, job1)
      Queue.add(queue, job2)
    })

    it('polls and execute job from queue', function() {
      let action = () => {
        Worker.start(worker)
        this.clock.tick(32)
      }
      expect(action).to.decrease(queue.q, 'size')
      expect(job1.execute).to.have.been.calledOnce
      expect(job2.execute).to.have.been.calledOnce
    })

    context('when bandwith is full', function() {
      beforeEach(function() {
        worker.pending = worker.max
      })

      it('stops executing the job', function() {
        let action = () => {
          Worker.start(worker)
          this.clock.tick(32)
        }
        expect(action).to.not.decrease(queue.q, 'size')
      })

      it('clean up the queue', function() {
        sinon.spy(queue.q, 'trim')
        Worker.start(worker)
        this.clock.tick(32)
        expect(queue.q.trim).to.have.been.called
      })

      it('schedules another worker job after sleep time', function() {
        spy(global, 'setTimeout', spy => {
          Worker.start(worker)
          expect(spy).to.have.been.calledWith(Worker.start, worker.sleep)
        })
      })
    })

    context('when queue is empty', function() {
      let queue = Queue.init()
      let worker = Worker.init(queue)

      it('stops executing the job', function() {
        sinon.spy(Queue, 'get')

        expect(Queue.isEmpty(queue)).to.eq(true)
        Worker.start(worker)
        expect(Queue.get).to.not.have.been.called
      })

      it('clean up the queue', function() {
        sinon.spy(Queue, 'cleanup')

        Worker.start(worker)
        expect(Queue.cleanup).to.have.been.called
      })

      it('schedules another worker job after sleep time', function() {
        spy(global, 'setTimeout', spy => {
          Worker.start(worker)
          expect(spy).to.have.been.calledWith(Worker.start, worker.sleep)
        })
      })
    })
  })

  describe('stop', function() {
    let queue = Queue.init()
    let worker = Worker.init(queue)
    beforeEach(function() {
      worker = Worker.init(queue)
    })

    it('sets continue to false', function() {
      expect(() => Worker.stop(worker)).to.change(worker, 'continue')
      expect(worker.continue).to.eq(false)
    })

    it('clears next scheduled worker job', function() {
      Worker.start(worker)

      expect(() => Worker.stop(worker)).to.change(worker, 'setTimeout')
      expect(worker.setTimeout).to.not.exist
    })
  })
})
