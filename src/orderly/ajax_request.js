import VersionTracker from './version_tracker'

const VERSIONS = new VersionTracker()

const URL_PARAMS_FORMAT = new RegExp(/\?.*$/);

function filterUrlParams(url) {
  return url.toString().replace(URL_PARAMS_FORMAT, '')
}

function contextTypeIsJSON(resp) {
  return resp._bodyBlob.type.includes('application/json')
}

function parseContentType(type) {
  return async function(resp) {
    if (type) {
      resp.data = await resp[type]()
    } else if (contextTypeIsJSON(resp)) {
      resp.data = await resp.json()
    }

    return resp
  }
}

function shouldSkip(cancelConditions) {
  return !cancelConditions.every(condition => !condition())
}

function shouldContinue(id, cancelConditions, reject) {
  return function(resp) {
    if (!cancelConditions.every(condition => !condition(resp))) {
      reject({ ...resp, status: 'cancelled', id })
    }

    return resp
  }
}

function buildCallback(callback, condition) {
  return function(resp) {
    if (condition(resp)) {
      resp = callback(resp)
    }

    return resp
  }
}

function onCatch(callback, cancelConditions) {
  return callback
}

function onFail(callback, cancelConditions) {
  return buildCallback(callback, (resp) => resp.status >= 400)
}

function onSuccess(callback, cancelConditions) {
  return buildCallback(callback, (resp) => resp.status < 400)
}

function requestContentType(type) {
  return type ? {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  } : {}
}

function buildHeaders({ headers = {}, type }) {
  return new Headers(Object.assign(headers, requestContentType(type)))
}

function buildBody({ body, type }) {
  return body ? type === 'json' ? JSON.stringify(body) : body : ""
}

function buildRequest(url, options) {
  let { credentials, mode, method, redirect } = options
  let headers = buildHeaders(options)
  let config = { headers, credentials, mode, method, redirect }

  let body = buildBody(options)
  if (body) config.body = body

  return new Request(url, config)
}

function buildDelayedAction(key, id, request, { type }, cancelConditions) {
  return function(resolve, reject) {
    return function() {
      if (shouldSkip(cancelConditions)) {
        reject({ status: 'skipped', id })
      } else {
        VERSIONS.setCurrent(key, id)

        return fetch(request)
          .then(shouldContinue(id, cancelConditions, reject))
          .then(parseContentType(type))
          .then(resolve)
          .catch(reject)
      }
    }
  }
}

class AjaxRequest {
  constructor(url, options = {})  {
    let request = buildRequest(url, options)
    let key = filterUrlParams(url)
    let id = VERSIONS.inc(key)

    this.cancelConditions = []
    if (options.version !== false) {
      let version = () => VERSIONS.getCurrent(key) > id
      this.cancelConditions.push(version)
    }

    this.action = buildDelayedAction(key, id, request, options, this.cancelConditions)

    this.promise = new Promise((resolve, reject) => {
      this.execute = this.action(resolve, reject)
    })
  }

  cancel(callback) {
    this.cancelConditions.push(callback)
    return this
  }

  catch(callback) {
    console.log('catch')
    this.promise.catch(callback)
    return this
  }

  fail(callback) {
    return this.then(onFail(callback))
  }

  success(callback) {
    return this.then(onSuccess(callback))
  }

  then(callback) {
    this.promise.then(callback)
    return this
  }

}

export default AjaxRequest
