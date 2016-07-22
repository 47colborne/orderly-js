import { assert, expect, lib, sinon } from '../test_helper'

let AsyncJob = lib.src('orderly/async_job')
let Queue = lib.src('orderly/queue')
let Worker = lib.src('orderly/worker')

describe('Worker', function() {

  let queue = new Queue()

  beforeEach(function() {
    this.clock = sinon.useFakeTimers()
  })

  afterEach(function() {
    this.clock.restore()
  })

  describe('start', function() {
    it('should start an interval job', function() {
      let spy = sinon.spy(global, 'setInterval')
      let worker = Worker.start(queue)

      expect(spy).to.be.calledOnce
    })

    it('should have default 50ms sleep time', function() {
      let spy = sinon.spy(global, 'setInterval')
      let worker = Worker.start(queue)

      expect(spy).to.be.calledWith(
        sinon.match.typeOf('function'),
        50
      )
    })

    context('when sleep is given as an options', function() {
      it('should start the interval job with sleep time', function() {
        let spy = sinon.spy(global, 'setInterval')
        let sleep = 100
        let worker = Worker.start(queue, { sleep })

        expect(spy).to.be.calledWith(
          sinon.match.typeOf('function'),
          sleep
        )
      })
    })
  })

  describe('stop', function() {
    it('should stop the worker', function() {
      let spy = sinon.spy(global, 'clearInterval')
      let worker = Worker.start(queue)

      Worker.stop(worker)
      expect(spy).to.be.calledOnce.calledWith(worker)
    })
  })

  describe('worker\'s behaviours', function() {

    // job action builder
    let buildAction = function(action, delay = 0) {
      return () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (action) action(resolve, reject)
          }, delay)
        })
      }
    }

    context('when queue is empty', function() {
      it('should do nothing', function() {
        let spy = sinon.spy(queue, 'get')
        let worker = Worker.start(queue)

        this.clock.tick(100)
        expect(spy).to.be.not.called
        Worker.stop(worker)
      })
    })

    context('when queue is NOT empty', function() {
      context('and the max has NOT being reached', function() {
        it('should process jobs', function() {
          let worker = Worker.start(queue)
          let run = sinon.spy(buildAction((res, rej) => res(true)))
          let job = { run }

          queue.add(job)

          this.clock.tick(50)
          expect(run).to.be.calledOnce
          Worker.stop(worker)
        })
      })

      context('and the max has being reached', function() {
        let worker = Worker.start(queue)

        it('should not trigger another job', function() {
          let actions = new Array(8)
            .fill(undefined)
            .map((_, index) => index)
            .map((i) => buildAction((res, rej) => null))

          actions
            .map(action => ({ run: action, priority: 1  }))
            .forEach(job => queue.add(job))

          let run = buildAction((res, rej) => res(true))
          run = sinon.spy(run)
          queue.add({ run, priority: 0 })

          this.clock.tick(50)
          expect(run).to.not.be.called
        })
      })
    })

  })
})
