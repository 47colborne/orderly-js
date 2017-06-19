import { assert, expect, lib, sinon } from "../../test_helper"

import Queue from "../../../src/orderly-v2/Queue"

describe("queue", function() {

  it("returns an queue with add, get, empty, trim on create", function() {
    let queue = Queue.create()

    assert.containsAllKeys(queue, ["add", "get", "empty", "trim"])
  })

  it("sorts task by priority and id by default", function() {
    let queue = Queue.create()

    let task1 = {id: 1, priority: 1}
    let task2 = {id: 2, priority: 2}
    let task3 = {id: 3, priority: 2}

    queue.add(task1, task2, task3)

    assert.equal(queue.get(), task2)
    assert.equal(queue.get(), task3)
    assert.equal(queue.get(), task1)
  })

  it("accepts sortBy option on create", function() {
    let sortBy = (x, y) => x.weight < y.weight

    let queue = Queue.create({ sortBy })

    let task1 = {id: 1, weight: 2}
    let task2 = {id: 2, weight: 1}
    let task3 = {id: 3, weight: 3}

    queue.add(task1, task2, task3)

    assert.equal(queue.get(), task2)
    assert.equal(queue.get(), task1)
    assert.equal(queue.get(), task3)
  })

  context("when given a add function in options", function() {
    it("calls the add function with task and heap instead", function() {
      let add = sinon.spy()
      let queue = Queue.create({ add })
      let task = {}
      queue.add(task)

      sinon.assert.calledWith(add, task, queue.heap)
    })
  })

  context("when given a get function in options", function() {
    it("calls the get function with heap instead", function() {
      let get = sinon.spy()
      let queue = Queue.create({ get })
      let task = {}
      queue.add(task)
      queue.get()

      sinon.assert.calledWith(get, queue.heap)
    })
  })

  context("when given a empty function in options", function() {
    it("calls the get function with heap instead", function() {
      let empty = sinon.spy()
      let queue = Queue.create({ empty })
      let task = {}
      queue.add(task)
      queue.empty()

      sinon.assert.calledWith(empty, queue.heap)
    })
  })

  context("when given a empty function in options", function() {
    it("calls the get function with heap instead", function() {
      let trim = sinon.spy()
      let queue = Queue.create({ trim })
      let task = {}
      queue.add(task)
      queue.trim()

      sinon.assert.calledWith(trim, queue.heap)
    })
  })

  context("when given options", function() {
    it("remains in the returns queue", function() {
      let options = {
        a: sinon.spy(),
        b: sinon.spy()
      }

      let queue = Queue.create(options)

      assert.equal(queue.a, options.a)
      assert.equal(queue.b, options.b)
    })
  })

})