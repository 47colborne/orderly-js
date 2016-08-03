import { setMode } from './debug'

import Ajax from './orderly/request'
import Job from './orderly/job'
import Queue from './orderly/queue'
import Worker from './orderly/worker'

function Orderly({ debug, max, sleep } = {}) {

  // ============================================
  // debug mode
  // ============================================
  setMode(debug)

  // ============================================
  // initialize queue and worker
  // ============================================
  let queue = new Queue
  let worker = new Worker(queue, { max, sleep })

  // ============================================
  // Public Functions
  // ============================================

  // create an ajax request
  // that wraps inside a job with priority
  // and insert the job to the queue
  // finally return the request
  function ajax(url, options = {}) {
    let { priority, ...rest } = options
    let req = new Ajax(url, rest)
    let job = new Job({ action: req.execute, priority })
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
