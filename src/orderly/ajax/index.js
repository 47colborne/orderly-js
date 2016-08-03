
import callbacks from './callbacks'
import contentType from './content_type'
import { filterParams } from './url'

import Version from './version'

const SKIP_STATUS = { status: 'skipped' }
const CANCEL_STATUS = { status: 'cancelled' }

function someConditionMet(conditions, value) {
  return conditions.some(condition => condition(value))
}

function shouldSkip(conditions, version) {
  return someConditionMet(conditions) || version.sentIsOutdated()
}

function shouldCancel(resp, conditions, version, reject) {
  if (someConditionMet(conditions, resp) || version.receivedIsOutdated()) {
    resp = { ...resp, ...CANCEL_STATUS }
    return reject(resp)
  }
}

function proxy(callback, ...args) {
  return function(resp) {
    callback(resp, ...args)
    return resp
  }
}

function initHeader(headers, type) {
  return new Headers({ ...headers, ...contentType.request(type) })
}

function initBody(body, type) {
  return body && type === 'json' ? JSON.stringify(body) : body
}

function initRequest(url, { headers, body, type, ...options }) {
  headers = initHeader(headers, type)
  body = initBody(body, type)
  options = { ...options, headers, body }

  return new Request(url, { ...options, headers, body })
}

function initAction(request, { type }, version) {
  return function(resolve, reject) {
    return function(conditions) {
      if (shouldSkip(conditions, version))
        return reject(SKIP_STATUS)

      version.sent()
      return fetch(request)
        .then(proxy(shouldCancel, conditions, version, reject))
        .then(proxy(version.received))
        .then(proxy((resp) => resp.version = version))
        .then(contentType.parse(type))
        .then(resolve)
        .catch(reject)
    }
  }
}

function initExecute(func, conditions) {
  return function() { return func(conditions) }
}

class Ajax {
  constructor(url, { version, ...options } = {}) {
    version = new Version(filterParams(url), version)

    let request = initRequest(url, options)
    let action = initAction(request, options, version)

    this.conditions = []
    this.q = new Promise((resolve, reject) => {
      action = action(resolve, reject)
      this.execute = initExecute(action, this.conditions)
    })
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
    return this.then(callbacks.onFail(callback))
  }

  success(callback) {
    return this.then(callbacks.onSuccess(callback))
  }

  then(callback) {
    this.q = this.q.then(callback)
    return this
  }

}

export default Ajax