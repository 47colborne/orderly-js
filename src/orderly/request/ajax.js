import Version from '../Version'

import { buildCallback, onCatch, onFail, onSuccess } from './callbacks'
import { parseContentType, requestContentType } from './content_type'
import { filterParams } from './url'

function someConditionMet(conditions, value) {
  return conditions.some(condition => condition(value))
}

function shouldSkip(conditions) {
  return someConditionMet(conditions)
}

function shouldCancel(conditions, reject) {
  return function(resp) {
    let skip = shouldSkip(conditions)
    if (skip) reject({ ...resp, status: 'cancelled' })
    return skip
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
  options = { ...options, headers, body }

  return new Request(url, { ...options, headers, body })
}

function initAction(request, { type }, version) {
  return function(resolve, reject) {
    return function(conditions) {

      if (shouldCancel(conditions, reject)()) return


      version.setAsCurrent()

      return fetch(request)
        .then(shouldCancel(conditions, reject))
        .then(parseContentType(type))
        .then(resolve)
        .then(reject)
    }
  }
}

function initExecute(action, conditions) {
  return function() {
    return action(conditions)
  }
}

class Ajax {
  constructor(url, { version, ...options } = {}) {
    this.q = new Promise((resolve, reject) => {
      let request = initRequest(url, options)
      let version = new Version(filterParams(url), version)
      let action = initAction(request, options, version)

      action = action(resolve, reject)

      this.conditions = [version.isOutdated]
      this.execute = initExecute(action, this.conditions)
    })
  }

  cancel(callback) {
    this.conditions.push(callback)
    return this
  }

  catch(callback) {
    this.q.catch(callback)
    return this
  }

  fail(callback) {
    return this.then(onFail(callback))
  }

  success(callback) {
    return this.then(onSuccess(callback))
  }

  then(callback) {
    this.q.then(callback)
    return this
  }

}

export default Ajax
