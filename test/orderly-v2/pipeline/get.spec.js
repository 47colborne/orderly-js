import { assert, expect, lib, sinon } from "../../test_helper"

import get from "../../../src/orderly-v2/Pipeline/get"
import Queue from "../../../src/orderly-v2/Queue"

describe("get", function() {
  context("with no queue", function() {
    it("throws an error", function() {
      assert.throws(() => get([]), TypeError, "Queue can not be empty, please check the Orderly configuration")
    })
  })

  context("with single queue setup", function() {
    it("returns a getter function", function() {
      const queue = {get: x => x}
      const getter = get([queue])

      assert.isFunction(getter)
      assert.equal(queue.get, getter)
    })

    it("calls get on queue when invoked", function() {
      const queue = {get: sinon.spy()}
      const getter = get([queue])

      getter()

      sinon.assert.called(queue.get)
    })
  })

  context("with multi queue setup", function() {
    it("returns a getter function", function() {
      const queue1 = {get: x => x}
      const queue2 = {get: x => x}
      const getter = get([queue1, queue2])

      assert.isFunction(getter)
    })

    it("scenario 1: Queues are not empty", function() {

      // ==============================
      // configure 3 seperate queues
      // stub(id) always returns it's id
      // and empty always return true
      // ==============================
      const stub1 = sinon.stub().returns(1)
      const queue1 = Queue.create({
        id: 1,
        get: stub1,
        weight: 2,
        empty: () => false
      })

      const stub2 = sinon.stub().returns(2)
      const queue2 = Queue.create({
        id: 2,
        get: stub2,
        weight: 3,
        empty: () => false
      })

      const stub3 = sinon.stub().returns(3)
      const queue3 = Queue.create({
        id: 3,
        get: stub3,
        weight: 1,
        empty: () => false
      })

      // ==============================
      // calls get to obtain getter
      // ==============================
      const getter = get([queue1, queue2, queue3])

      // ==============================
      // iterates over 12 times
      // expects the results to iterate
      // throught the pipeline twice
      // ==============================
      const result = Array(12).fill(undefined).map(getter)

      const weight = result.reduce((weight, i) => {
        return {...weight,
          [i]: (weight[i] || 0) + 1,
          t: weight.t + 1
        }
      }, {t: 0})

      // ==============================
      // test the weights on the result
      // ==============================
      assert.closeTo(stub1.callCount / 12, 2/6, 0.1)
      assert.closeTo(stub2.callCount / 12, 3/6, 0.1)
      assert.closeTo(stub3.callCount / 12, 1/6, 0.1)

      // ==============================
      // tests on the number of times
      // the stubs gets called
      // ==============================
      sinon.assert.callCount(stub1, 4)
      sinon.assert.callCount(stub2, 6)
      sinon.assert.callCount(stub3, 2)

      // ==============================
      // test the order of returned values
      // ==============================
      assert.deepEqual(result, [
        2, 2, 2,
        1, 1,
        3,
        2, 2, 2,
        1, 1,
        3
      ])
    })

    it(`scenario 2:
      queue1.empty always return [...F]
      queue2.empty returns [F, T, T]
      queue3.empty returns [F, T, F]`, function() {

      // ==============================
      // configure 3 seperate queues
      // stub(id) always returns it's id
      // and stub3 is ALWAYS EMPTY
      // ==============================
      const stub1 = sinon.stub().returns(1)
      const queue1 = Queue.create({
        get: stub1,
        weight: 2,
        empty: () => false
      })

      const stub2 = sinon.stub().returns(2)
      const empty2 = sinon.stub()

      empty2.onCall(0).returns(false)
      empty2.onCall(1).returns(true)
      empty2.onCall(2).returns(true)

      const queue2 = Queue.create({
        get: stub2,
        weight: 3,
        empty: empty2
      })

      const stub3 = sinon.stub().returns(3)
      const empty3 = sinon.stub()

      empty3.onCall(0).returns(false)
      empty3.onCall(1).returns(true)
      empty3.onCall(2).returns(false)

      const queue3 = Queue.create({
        get: stub3,
        weight: 1,
        empty: empty3
      })

      // ==============================
      // calls get to obtain getter
      // ==============================
      const getter = get([queue1, queue2, queue3])

      // ==============================
      // iterates over 12 times
      // expects the results to iterate
      // throught the pipeline twice
      // ==============================
      const result = Array(20).fill(undefined).map(getter)

      // ==============================
      // test the weights on the result
      // ==============================
      assert.closeTo(stub1.callCount / 20, 2/6, 0.1)
      assert.closeTo(stub2.callCount / 20, 3/6, 0.1)
      assert.closeTo(stub3.callCount / 20, 1/6, 0.1)

      // ==============================
      // test the order of returned values
      // ==============================

      assert.deepEqual(result, [
        2,
        1, 1,
        2, 2,
        3,
        2, 2, 2,
        1, 1,
        2, 2, 2,
        1, 1,
        3,
        2, 2, 2
      ])
    })

    it(`scenario 3:
      queue1.empty returns [F, T, F, T]
      queue2.empty returns [...F]`, function() {

      // ==============================
      // configure 3 seperate queues
      // stub(id) always returns it's id
      // and stub3 is ALWAYS EMPTY
      // ==============================
      const stub1 = sinon.stub().returns(1)
      const empty1 = sinon.stub().returns(false)
      empty1
        .onCall(0).returns(false)
        .onCall(1).returns(true)
        .onCall(2).returns(false)
        .onCall(3).returns(true)
        .onCall(4).returns(true)

      const queue1 = Queue.create({
        get: stub1,
        weight: 4,
        empty: empty1
      })

      const stub2 = sinon.stub().returns(2)
      const empty2 = sinon.stub().returns(false)
      const queue2 = Queue.create({
        get: stub2,
        weight: 1,
        empty: empty2
      })

      // ==============================
      // calls get to obtain getter
      // ==============================
      const getter = get([queue1, queue2])

      // ==============================
      // iterates over 12 times
      // expects the results to iterate
      // throught the pipeline twice
      // ==============================
      const result = Array(20).fill(undefined).map(getter)

      // ==============================
      // test the weights on the result
      // ==============================
      assert.closeTo(stub1.callCount / 20, 0.8, 0.1)
      assert.closeTo(stub2.callCount / 20, 0.2, 0.1)

      // ==============================
      // test the order of returned values
      // ==============================
      assert.deepEqual(result, [
        1,
        2,
        1,
        2,
        1, 1, 1, 1, 1, 1,
        2,
        1, 1, 1, 1,
        2,
        1, 1, 1, 1
      ])
    })
  })
})
