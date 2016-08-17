import { setMode } from './debug'

import Ajax from './ajax'
import Job from './job'
import Queue from './queue'
import Worker from './worker'

function appendCallback(options, key, callback) {
  let previous = options[key]

  if (typeof callback === 'function') {
    if (typeof previous === 'function')  {
      callback = function(resp) { return callback(previous(resp)) }
    }

    return callback
  }
}

class Orderly {

  // ============================================
  // SET DEBUG MODE
  // ============================================

  static debugMode = function(bool) {
    setMode(bool)
    return this
  }

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
    if (!this.worker) {
      this.queue = new Queue
      this.worker = new Worker(this.queue, { max, sleep })
      this.default = new Orderly()
    }

    this.worker.start()

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

  withOptions({ before, after, ...options } = {}) {
    options.after = appendCallback(this.options, 'after', after)
    options.before = appendCallback(this.options, 'before', before)

    return new Orderly({ ...this.options, ...options })
  }

  after(callback) {
    this.options.after = appendCallback(this.options, 'after', callback)
    return this
  }

  before(callback) {
    this.options.before = appendCallback(this.options, 'before', callback)
    return this
  }

  ajax(url, options = {}) {
    if (!url) throw "Invalid URL: url is undefined"

    let req = new Ajax(url, Object.assign({}, this.options, options))
    let job = new Job(req.execute, options.priority)

    Orderly.queue.add(job)

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
