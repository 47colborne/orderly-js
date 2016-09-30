import { assert, expect, lib, sinon } from '../test_helper'

// let Queue = lib.src('orderly/queue')

// describe('Queue', function() {

//   function stubJob(priority, execute = () => {}) {
//     return { priority, execute }
//   }

//   let queue = Queue.init()
//   beforeEach(function() { queue = Queue.init() })

//   describe('add', function() {
//     it('accepts a job with action', function() {
//       expect(() => Queue.add(queue, stubJob())).to.increase(queue.q, 'size')
//     })

//     it('returns the job', function() {
//       let job = stubJob()
//       expect(Queue.add(queue, job)).to.eq(job)
//     })

//     it('thorws TypeError if invalid job is inserted', function() {
//       expect(() => Queue.add(queue, 'invalid job')).to.throw(TypeError)
//     })
//   })

//   describe('get', function() {
//     it('behaves like FIFO queue with same priority', function() {
//       let job1 = stubJob(0)
//       let job2 = stubJob(0)
//       let job3 = stubJob(0)
//       let job4 = stubJob(0)

//       Queue.add(queue, job1)
//       Queue.add(queue, job2)
//       Queue.add(queue, job3)
//       Queue.add(queue, job4)

//       expect(Queue.get(queue)).to.eq(job1)
//       expect(Queue.get(queue)).to.eq(job2)
//       expect(Queue.get(queue)).to.eq(job3)
//       expect(Queue.get(queue)).to.eq(job4)
//     })

//     it('returns a job with any priority first', function() {
//       let noPriorityJob = stubJob(undefined)
//       let highPriorityJob = stubJob(10)

//       Queue.add(queue, noPriorityJob)
//       Queue.add(queue, highPriorityJob)

//       expect(Queue.get(queue)).to.eq(highPriorityJob)
//       expect(Queue.get(queue)).to.eq(noPriorityJob)
//     })

//     it('returns a job with highest priority first', function() {
//       let lowPriorityJob = stubJob(0)
//       let midPriorityJob = stubJob(5)
//       let highPriorityJob1 = stubJob(10)
//       let highPriorityJob2 = stubJob(10)

//       Queue.add(queue, lowPriorityJob)
//       Queue.add(queue, midPriorityJob)
//       Queue.add(queue, highPriorityJob1)
//       Queue.add(queue, highPriorityJob2)

//       expect(Queue.get(queue)).to.eq(highPriorityJob1)
//       expect(Queue.get(queue)).to.eq(highPriorityJob2)
//       expect(Queue.get(queue)).to.eq(midPriorityJob)
//       expect(Queue.get(queue)).to.eq(lowPriorityJob)
//     })

//     context('when queue is empty', function() {
//       it('returns undefined', function() {
//         expect(Queue.isEmpty(queue)).to.eq(true)
//         expect(Queue.get(queue)).to.eq(undefined)
//       })
//     })
//   })

//   describe('#isEmpty', function() {
//     it('returns true when queue is empty', function() {
//       expect(Queue.isEmpty(queue)).to.eq(true)
//     })

//     it('returns false when queue is not empty', function() {
//       Queue.add(queue, stubJob())
//       expect(Queue.isEmpty(queue)).to.eq(false)
//     })
//   })

//   describe('#size', function() {
//     it('should the length of the job', function() {
//       let size = Math.floor(Math.random() * 10 + 1)
//       let jobs = new Array(size)
//         .fill(undefined)
//         .forEach(() => Queue.add(queue, stubJob()))

//       expect(Queue.size(queue)).to.eq(size)
//     })
//   })

//   describe('#trim', function() {
//     it('should trigger FastPriorityQueue#trim', function() {
//       sinon.spy(queue.q, 'trim')
//       Queue.trim(queue)
//       expect(queue.q.trim).to.have.been.called
//     })
//   })
// })
