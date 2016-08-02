import AjaxRequest from './orderly/ajax_request'
import Job from './orderly/job'
import Queue from './orderly/queue'
import Worker from './orderly/worker'


function Orderly(config = {}) {

  // ============================================
  // debug mode
  // ============================================

  AjaxRequest.debug = Job.debug = Queue.debug = Worker.debug = config.debug

  // ============================================
  // initialize environment
  // ============================================

  let queue = new Queue
  let worker = new Worker(queue, config)

  // ============================================
  // Private Functions
  // ============================================

  // filter out url params from the url
  // example:
  //   input: http://www.yroo.com/products/123?country=ca
  //   output: http://www.yroo.com/products/123
  // ============================================



  // filter abort condition
  // ============================================

  function filterAbort(abort) {
    if (abort && typeof abort === 'function') return abort
  }

  // build version validation
  // ============================================



  // build cancel condition
  // request should cancel if version is outdated
  // or abort condition returns true
  // ============================================

  function buildCancel(abort, url, version) {
    abort = filterAbort(abort)
    version = buildVersion(url, version)
    return () => (
      (version && !version()) ||
      (abort && abort())
    )
  }

  // check if request is success
  // ============================================

  function isBadRequest({ status }) {
    return status >= 400
  }

  // returns a new job given action callback
  // and priority
  // ============================================

  function buildJob(action, priority) {
    return new Job({ action, priority })
  }

  function rejectBadRequest(reject) {
    return (resp) => isBadRequest(resp) ? reject(resp) : resp
  }

  function responseType(type = 'text') {
    return async (resp) => {
      let body = await resp[type]()
      return { ...resp, body }
    }
  }

  function shouldCancel(cancel, reject) {
    return (resp) => cancel() ? reject({ ...resp, cancelled: true }) : resp
  }

  // ============================================
  // Public Functions
  // ============================================

  function ajax(url, options = {}) {
    let { priority } = options
    let req = new AjaxRequest(url, options)
    let job = buildJob(req.execute, priority)

    queue.add(job)

    return req.catch(err => console.log("ERROR", err))
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
