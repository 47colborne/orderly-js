import { onSuccess, onFail } from './callbacks'
import { requestContentType, parseContentType } from './content_type'
import { filterParams } from './url'
import { log } from '../debug'

import Version from './version'

const SKIP_STATUS = 'skipped'
const CANCEL_STATUS = 'cancelled'
const STAMP_KEY = '_v'

function logAction(action, version, priority) {
  log('Ajax', action, {
    url: version.key,
    id: version.id,
    priority
  })
}

function someConditionMet(conditions, value) {
  return conditions.some(condition => condition(value))
}

function shouldSkip(conditions, version) {
  return someConditionMet(conditions) || version.sentIsOutdated()
}

function shouldCancel(resp, conditions, version, priority, reject) {
  if (someConditionMet(conditions, resp) || version.receivedIsOutdated()) {
    logAction('CANCELLED', version, priority)
    resp = { ...resp, status: CANCEL_STATUS }
    return reject(resp)
  } else {
    logAction('RECEIVED', version, priority)
  }
}

function stamp(resp, key, value) {
  { resp[key] = value }
}

function proxy(callback, ...args) {
  return (resp) => {
    callback(resp, ...args)
    return resp
  }
}

function initHeader(headers, type) {
  return new Headers({ ...headers, ...requestContentType(type) })
}

function initBody(body, type) {
  return body && type === 'json' ? JSON.stringify(body) : body
}

function initRequest(url, { headers, body, type, ...options }) {
  headers = initHeader(headers, type)
  body = initBody(body, type)
  return new Request(url, { ...options, headers, body })
}

function initAction(request, { type, priority }, version) {
  return (resolve, reject) => {
    return (conditions) => {
      if (shouldSkip(conditions, version)) {
        logAction('SKIPPED', version, priority)
        return reject({ status: SKIP_STATUS })
      }

      version.sent()
      logAction('SENT', version, priority)

      return fetch(request)
        .then(proxy(shouldCancel, conditions, version, priority, reject))
        .then(proxy(version.received))
        .then(proxy(stamp, STAMP_KEY, version))
        .then(parseContentType(type))
        .then(resolve)
        .catch(reject)
    }
  }
}

function initExecute(func, conditions) {
  return () => func(conditions)
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

    logAction('CREATED', version, options.priority)
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
