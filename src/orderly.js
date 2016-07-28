import Job from './orderly/job'
import Queue from './orderly/queue'
import Worker from './orderly/worker'
import VersionTracker from './orderly/version_tracker'

function Orderly(config = {}) {
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

  function filterSearchParams(url) {
    return `${ url }`.replace(/\?.*$/, '')
  }

  function buildAbort(abort) {
    if (abort) return abort
  }

  function buildVersion(url, version) {
    if (version === undefined) version = true

    if (version) {
      let key = filterSearchParams(url)
      let next = versioning.inc(key)

      return () => versioning.get(key) === next
    }
  }

  function buildCancel(abort, url, version) {
    abort = buildAbort(abort)
    version = buildVersion(url, version)
    return () => (version && !version()) || (abort && abort())
  }

  function isGoodRequest({ status }) {
    return status >= 200 && status < 400
  }

  function buildJob(action, priority) {
    return new Job({ action, priority })
  }

  function responseStatus(reject) {
    return (resp) => isGoodRequest(resp) ? resp : reject(resp)
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
        .then(responseStatus(reject))
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