import { onSuccess, onFail, proxy } from './callbacks'

import request from './request'
import response from './response'

import { filterParams } from './url'

import { STATUS_KEY, STATUS_SKIP, STATUS_CANCEL, VERSION_KEY } from './constants'
import { debugLogger } from './misc'

import Version from './version'

function buildResponse(status, version) {
  return {
    [STATUS_KEY]: status,
    [VERSION_KEY]: version,
    skipped: STATUS_SKIP === status,
    cancelled: STATUS_CANCEL === status
  }
}

function conditionMet(condition, arg) {
  return (typeof condition === 'function') && condition(arg)
}

function shouldSkip(skip, condition, version) {
  return skip !== false && (
    conditionMet(condition) ||
    Version.isOutdated(version, 'sent'
  ))
}

function shouldCancel(resp, condition, version, priority) {
  if (conditionMet(condition, resp) || Version.isOutdated(version, 'received')) {
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
  return Object.assign(
    headers,
    request.accepts(type),
    request.contentType(body, type)
  )
}

function initBody(body, type) {
  return body && (typeof body === 'object' || type === 'json') ? JSON.stringify(body) : body
}

function initRequest(url, { before, headers, body, type, ...options }) {
  options.headers = initHeader(headers, body, type)
  options.body = initBody(body, type)

  if (before) before(options)

  return options
}

function initAction(url, request, version, { type, priority, skip }) {
  return function(condition) {
    if (shouldSkip(skip, condition, version)) {
      debugLogger('SKIPPED', version, priority)
      return Promise.reject(buildResponse(STATUS_SKIP, version))
    }

    version.sent()
    debugLogger('SENT', version, priority)

    return fetch(url, request)
      .then(proxy(shouldCancel, condition, version, priority))
      .then(proxy(version.received))
      .then(proxy(appendVersion, version))
      .then(response.contentType)
  }
}

class Ajax {
  constructor(url, { after, group, versioned, ...options } = {}) {
    let version = new Version(group || filterParams(url), versioned)
    let request = initRequest(url, options)
    let action = initAction(url, request, version, options)

    this.q = new Promise((resolve, reject) => {
      this.execute = () => {
        action(this.condition)
          .then(this.__done__)
          .then(proxy(after))
          .then(resolve)
          .catch(reject)
          .then(this.__cleanup__)
      }
    })

    debugLogger('CREATED', version, options.priority)
  }

  __done__ = (resp) => {
    return this.q = Promise.resolve(resp)
  }

  __cleanup__ = () => {
    this.execute = this.condition = undefined
  }

  cancel(callback) {
    this.condition = callback
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
