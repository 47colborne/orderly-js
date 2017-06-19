import { assert, expect, lib, sinon } from "../../test_helper"

import add from "../../../src/orderly-v2/Pipeline/add"

describe("add", function() {
  context("with no queue", function() {
    it("throws an error", function() {
      assert.throws(() => add([]), TypeError, "Queue can not be empty, please check the Orderly configuration")
    })
  })

  context("with single queue configuration", function() {
    it("returns a adder function", function() {
      const queue = {add: () => {}}
      const adder = add([queue])

      assert.isFunction(adder)
    })

    it("always add the task to the only queue", function() {
      const spy = sinon.spy()
      const queue = {add: spy}

      const adder = add([queue])

      const task = {}

      adder(task)

      sinon.assert.calledWith(spy, task)
    })
  })

  context("with multi queue configuration", function() {
    it("adds the task based on the bucket function", function() {
      const queue1 = {
        add: sinon.spy(),
        bucket: task => task.id > 5
      }
      const queue2 = {
        add: sinon.spy()
      }

      const adder = add([queue1, queue2])

      const task1 = { id: 7 }
      const task2 = { id: 5 }

      adder(task1, task2)

      sinon.assert.calledWith(queue1.add, task1)
      sinon.assert.calledWith(queue2.add, task2)
    })

    context("when the first queue does not contain a bucket function", function() {
      it("always map the task to the first queue", function() {
        const withoutBucket = {
          add: sinon.spy()
        }
        const withBucket = {
          add: sinon.spy(),
          bucket: task => task.id > 5
        }

        const adder = add([withoutBucket, withBucket])

        const task1 = { id: 7 }
        const task2 = { id: 5 }

        adder(task1, task2)

        sinon.assert.calledWith(withoutBucket.add, task1)
        sinon.assert.calledWith(withoutBucket.add, task2)
        sinon.assert.notCalled(withBucket.add)
      })
    })
  })
})
