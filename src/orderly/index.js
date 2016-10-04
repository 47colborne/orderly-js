import { setMode } from './debug'

import Ajax from './ajax'
import * as Job from './job'
import * as Queue from './queue'
import * as Worker from './worker'

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
      this.queue = Queue.init()
      this.worker = Worker.init(this.queue, { max, sleep })
      this.default = new Orderly()
    }
    Worker.start(this.worker)
    return this.default
  }

  static pause = function() {
    if (this.worker) Worker.stop(this.worker)
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

  withOptions(options = {}) {
    return new Orderly({ ...this.options, ...options })
  }

  after(callback) {
    if (typeof callback !== 'function') throw ("Invalid Function Call #after")
    this.options.after = callback
    return this
  }

  before(callback) {
    if (typeof callback !== 'function') throw ("Invalid Function Call #before")
    this.options.before = callback
    return this
  }

  ajax(url, options = {}) {
    if (!url) throw "Invalid URL: url is undefined"

    let req = new Ajax(url, Object.assign({}, this.options, options))
    let job = Job.init(req.execute, options.priority)

    Queue.addJob(Orderly.queue, job)

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
