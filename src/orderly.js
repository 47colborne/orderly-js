import Ajax from './orderly/ajax'
import Job from './orderly/job'
import Queue from './orderly/queue'
import Worker from './orderly/worker'
import VersionTracker from './orderly/version_tracker'

function Orderly(config = {}) {

  // ============================================
  // debug mode
  // ============================================

  Job.debug = Queue.debug = Worker.debug = config.debug

  // ============================================
  // initialize environment
  // ============================================

  let queue = new Queue
  let worker = new Worker(queue, config)
  let versioning = new VersionTracker

  // ============================================
  // Private Functions
  // ============================================

  // filter out url params from the url
  // example:
  //   input: http://www.yroo.com/products/123?country=ca
  //   output: http://www.yroo.com/products/123
  // ============================================

  let urlParamFormat = new RegExp(/\?.*$/);

  function filterUrlParams(url) {
    return url.toString().replace(urlParamFormat, '')
  }

  // filter abort condition
  // ============================================

  function filterAbort(abort) {
    if (abort && typeof abort === 'function') return abort
  }

  // build version validation
  // ============================================

  function buildVersion(url, version) {
    if (version !== false) {
      let key = filterUrlParams(url)
      let next = versioning.inc(key)

      return () => versioning.get(key) === next
    }
  }

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

  function buildAction(url, options, resolve, reject) {
    let { abort, type, version } = options
    return () => {
      return fetch(url, options)
        .then(rejectBadRequest(reject))
        .then(shouldCancel(buildCancel(abort, url, version), reject))
        .then(responseType(type))
        .then(resolve)
        .catch(reject)
    }
  }

  // ============================================
  // Public Functions
  // ============================================

  function ajax(url, options = {}) {
    let { priority } = options
    let req = new Ajax(url, options)
      .success(resp => resp.comment = "I rock" )
      .then(resp => console.log('comment', resp.comment))
      .then(resp => console.log('t', resp))
      .fail((resp) => console.log('f', resp))

    return new Promise((resolve, reject) => {
      queue.add(
        buildJob(
          buildAction(url, options, resolve, reject),
          priority
        )
      )
    })
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

  return { ajax, get, post, put, del, versioning, queue, worker }
}

export default Orderly
