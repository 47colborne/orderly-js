import { setMode } from './debug'

import Ajax from './ajax'
import Job from './job'
import Queue from './queue'
import Worker from './worker'

function Orderly({ debug, max, sleep } = {}) {

  // ============================================
  // SET DEBUG MODE
  // ============================================
  setMode(debug)

  // ============================================
  // INITIALIZE QUEUE AND WORKER
  // ============================================
  let queue = new Queue
  let worker = new Worker(queue, { max, sleep })

  // ============================================
  // PUBLIC INTERFACE
  // ============================================

  function ajax(url, options = {}) {
    let req = new Ajax(url, options)
    let job = new Job({
      action: req.execute,
      priority: options.priority
    })

    queue.add(job)

    return req
  }

  function get(url, options = {}) {
    return ajax(url, { ...options, method: 'GET' })
  }

  function post(url, options = {}) {
    return ajax(url, { ...options, method: 'POST' })
  }

  function put(url, options = {}) {
    return ajax(url, { ...options, method: 'PUT' })
  }

  function del(url, options = {}) {
    return ajax(url, { ...options, method: 'DELETE' })
  }

  return { ajax, get, post, put, del, queue, worker }
}

export default Orderly
