import { onSuccess, onFail, proxy } from './callbacks'
import { parseResponse, requestContentType } from './content_type'
import { filterParams } from './url'
import { log } from '../debug'

import Version from './version'

const STATUS_KEY = 'statusText'
const STATUS_SKIP = 'skipped'
const STATUS_CANCEL = 'cancelled'
const VERSION_KEY = 'version'

function debugLogger(action, version, priority) {
  log('Ajax', action, { url: version.key, id: version.id, priority })
}

function buildResponse(status, version) {
  return {
    [STATUS_KEY]: status,
    [VERSION_KEY]: version,
    skipped: STATUS_SKIP === status,
    cancelled: STATUS_CANCEL === status
  }
}

function anyConditionMet(conditions, ...args) {
  return conditions.some(condition => condition(...args))
}

function shouldSkip(skip, conditions, version) {
  return skip !== false && (anyConditionMet(conditions) || version.sentIsOutdated())
}

function shouldCancel(resp, conditions, version, priority) {
  if (anyConditionMet(conditions, resp) || version.receivedIsOutdated()) {
    debugLogger('CANCELLED', version, priority)
    throw(buildResponse(STATUS_CANCEL, version))
  } else {
    debugLogger('RECEIVED', version, priority)
  }
}

function appendVersion(resp, value) {
  resp[VERSION_KEY] = value
}

function initHeader(headers = {}, body, type) {
  return Object.assign(headers, requestContentType(body, type))
}

function initBody(body, type) {
  return body && (typeof body === 'object' || type === 'json') ? JSON.stringify(body) : body
}

function initRequest(url, { headers, body, type, ...options }) {
  options.headers = initHeader(headers, body, type)
  options.body = initBody(body, type)
  return options
}

function initAction(url, request, version, { type, priority, skip }) {
  return function(conditions) {
    if (shouldSkip(skip, conditions, version)) {
      debugLogger('SKIPPED', version, priority)
      return Promise.reject(buildResponse(STATUS_SKIP, version))
    }

    version.sent()
    debugLogger('SENT', version, priority)

    return fetch(url, request)
      .then(proxy(shouldCancel, conditions, version, priority))
      .then(proxy(version.received))
      .then(proxy(appendVersion, version))
      .then(parseResponse(type))
  }
}

class Ajax {
  constructor(url, { version, ...options } = {}) {
    // create new version for this request
    version = new Version(filterParams(url), version)

    // build request object
    let request = initRequest(url, options)

    // build action function
    let action = initAction(url, request, version, options)

    // initialize conditions used by skipping or cancelling request
    this.conditions = []

    // initialize the request promise
    this.q = new Promise((resolve, reject) => {

      // build execute function, invoke sometimes later by Worker
      this.execute = () => {

        // trigger the action with the conditions passed in
        // action must returns an promise
        return action(this.conditions)
          .then(this.__done__)
          .then(resolve)
          .catch(reject)
          .then(this.__cleanup__)
      }
    })

    debugLogger('CREATED', version, options.priority)
  }

  // Resolve with a new promise to dispose the previouse promise
  __done__ = (resp) => {
    return this.q = Promise.resolve(resp)
  }

  // clean up after the request
  __cleanup__ = () => {
    this.execute = this.conditions = undefined
  }

  // add cancel conditions
  cancel(callback) {
    this.conditions.push(callback)
    return this
  }

  // proxy through the promise catch clause
  catch(callback) {
    this.q = this.q.catch(callback)
    return this
  }

  // invoking callback only when response status is 400 and above
  fail(callback) {
    return this.then(onFail(callback))
  }

  // invoking callback only when response status is less than 400
  success(callback) {
    return this.then(onSuccess(callback))
  }

  // reuglar then chaining clause
  then(callback) {
    this.q = this.q.then(callback)
    return this
  }
}

export default Ajax
