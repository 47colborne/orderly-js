import { setMode } from './debug'

import Ajax from './ajax'
import Job from './job'
import Queue from './queue'
import Worker from './worker'



class Orderly {

  // ============================================
  // SET DEBUG MODE
  // ============================================

  static setMode = setMode

  // ============================================
  // CLASS SHARED VERIABLES
  // ============================================

  static queue = undefined

  static worker = undefined

  static global = undefined

  // ============================================
  // CLASS FUNCTIONS
  // ============================================

  static start = function({ max, sleep } = {}) {
    if (this.worker) {
      this.worker.start()
    } else {
      this.queue = new Queue
      this.worker = new Worker(this.queue, { max, sleep })
      this.default = new Orderly()
    }

    return this.default
  }

  static pause = function() {
    if (this.worker) this.worker.stop()
  }

  static stop = function() {
    this.pause()
    this.queue = this.worker = this.default = undefined
  }

  // ============================================
  // PUBLIC INTERFACE
  // ============================================

  constructor(options = {}) {
    this.options = options
  }

  withOptions({ as, ...options } = {}) {
    return new Orderly(Object.assign({}, this.options, options))
  }

  ajax(url, options = {}) {
    let req = new Ajax(url, Object.assign({}, this.options, options))
    let job = new Job({ action: req.execute, priority: options.priority })

    queue.add(job)

    return req
  }

  get(url, options = {}) {
    return this.ajax(url, Object.assign(options, { method: 'GET' }))
  }

  post(url, options = {}) {
    return this.ajax(url, Object.assign(options, { method: 'POST' }))
  }

  put(url, options = {}) {
    return this.ajax(url, Object.assign(options, { method: 'PUT' }))
  }

  del(url, options = {}) {
    return this.ajax(url, Object.assign(options, { method: 'DELETE' }))
  }
}

export default Orderly
