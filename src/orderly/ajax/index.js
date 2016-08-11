import { onSuccess, onFail, proxy } from './callbacks'
import { parseResponse, requestContentType } from './content_type'
import { filterParams } from './url'
import { log } from '../debug'

import Version from './version'

const VERSION_KEY = 'orderly_version'
const STATUS_KEY = 'orderly_status'
const STATUS_SKIP = 'ORDERLY_SKIPPED'
const STATUS_CANCEL = 'ORDERLY_CANCELLED'

function logAction(action, version, priority) {
  log('Ajax', action, { url: version.key, id: version.id, priority })
}

function anyConditionMet(conditions, ...args) {
  return conditions.some(condition => condition(...args))
}

function shouldSkip(skip, conditions, version) {
  return skip !== false && (anyConditionMet(conditions) || version.sentIsOutdated())
}

function shouldCancel(resp, conditions, version, priority) {
  if (anyConditionMet(conditions, resp) || version.receivedIsOutdated()) {
    logAction('CANCELLED', version, priority)
    throw({ [STATUS_KEY]: STATUS_CANCEL })
  } else {
    logAction('RECEIVED', version, priority)
  }
}

function insertVersion(resp, value) {
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
      logAction('SKIPPED', version, priority)
      return Promise.reject({ [STATUS_KEY]: STATUS_SKIP })
    }

    version.sent()
    logAction('SENT', version, priority)

    return fetch(url, request)
      .then(proxy(shouldCancel, conditions, version, priority))
      .then(proxy(version.received))
      .then(proxy(insertVersion, version))
      .then(parseResponse(type))
  }
}

class Ajax {
  constructor(url, { version, ...options } = {}) {
    version = new Version(filterParams(url), version)

    let request = initRequest(url, options)
    let action = initAction(url, request, version, options)

    this.conditions = []

    this.q = new Promise((resolve, reject) => {
      this.execute = () => {
        return action(this.conditions)
          .then(this.__done__)
          .then(resolve)
          .catch(reject)
          .then(this.__cleanup__)
      }
    })

    logAction('CREATED', version, options.priority)
  }

  __done__ = (resp) => {
    return this.resp = resp
  }

  __cleanup__ = () => {
    this.q = this.execute = this.conditions = undefined
  }

  cancel(callback) {
    this.conditions.push(callback)
    return this
  }

  catch(callback) {
    this.q = this.q.catch(callback)
    return this
  }

  fail(callback) {
    return this.then(onFail(callback))
  }

  success(callback) {
    return this.then(onSuccess(callback))
  }

  then(callback) {
    this.q = this.q.then(callback)
    return this
  }
}

export default Ajax
