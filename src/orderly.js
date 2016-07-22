import AsyncJob from './orderly/async_job'
import Queue from './orderly/queue'
import Worker from './orderly/worker'
import versioning from './orderly/versioning'

export default function(options = {}) {

  // initialize options
  let defaultOptions = { maxConcurrent: 8 }
  options = { ...defaultOptions, ...options }

  // initialize environment
  let queue = new Queue
  let worker = Worker.start(queue, {})


  // let worker = new Worker(queue, { })
  let versions = versioning.build()

  // Internal Functions
  let filterSearchParams = function(url) {
    return `${ url }`.replace(/\?.*$/, '')
  }

  let buildAbort = function(abort) {
    if (abort) return abort
  }

  let buildVersion = function({ url, version = true }) {
    if (version) {
      let type = filterSearchParams(url)
      let next = versioning.inc(versions, type)
      versions = versioning.set(versions, type, next)
      return () => versioning.get(versions, type) === next
    }
  }

  let buildCancel = function(abort, version) {
    abort = buildAbort(abort)
    version = buildVersion(version)
    return () => (abort && abort()) || (version && !version())
  }

  let isGoodRequest = function({ status }) {
    return status >= 200 && status < 400
  }

  let buildJob = function(action, priority) {
    return new AsyncJob({ action, priority })
  }

  let responseStatus = function(reject) {
    return (resp) => isGoodRequest(resp) ? resp : reject(resp)
  }

  let responseType = function(type = 'text') {
    return async (resp) => ({ ...resp, body: await resp[type]() })
  }

  let responseCancelled = function(cancel, reject) {
    return (resp) => cancel() ? reject({ ...resp, cancelled: true }) : resp
  }

  let buildAction = function(url, { abort, type, version, ...options }, resolve, reject) {
    return () => {
      return fetch(url, options)
        .then(responseStatus(reject))
        .then(responseCancelled(buildCancel(abort, url, version), reject))
        .then(responseType(type))
        .then(resolve)
        .catch(reject)
    }
  }

  // Public Interface

  class Orderly {
    ajax(url, { priority, ...options }) {
      return new Promise((resolve, reject) => {
        queue.add(
          buildJob(
            buildAction(url, options, resolve, reject),
            priority
          )
        )
      })
    }

    get(url, options = {}) {
      return this.ajax(url, { ...options, method: 'GET' })
    }

    post(url, options = {}) {
      return this.ajax(url, { ...options, method: 'POST' })
    }

    put(url, options = {}) {
      return this.ajax(url, { ...options, method: 'PUT' })
    }

    delete(url, options = {}) {
      return this.ajax(url, { ...options, method: 'DELETE' })
    }
  }

  return new Orderly()
}


