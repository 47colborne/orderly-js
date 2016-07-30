function contextTypeIsJSON(resp) {
  return resp._bodyBlob.type.includes('application/json')
}

function contentType(type) {
  return async function(resp) {
    if (type) {
      resp.body = await resp[type]()
    } else if (contextTypeIsJSON(resp)) {
      resp.body = await resp.json()
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

function onError(callback) {
  return function(err) {
    return callback(err)
  }
}

function onSuccess(callback) {
  return buildCallback(callback, (resp) => resp.status < 400)
}

function onFail(callback) {
  return buildCallback(callback, (resp) => resp.status >= 400)
}

function buildHeaders({ headers = {}, type }) {
  return new Header(Object.assign(headers, type))
}

function buildBody({ body, type }) {
  return body ? type === 'json' ? JSON.stringify(body) : body : null
}

function buildRequest(url, options) {
  return new Request ({
    url: url,
    headers: buildHeaders(options),
    body: buildBody(options)
  })
}

function buildAction(request, { type }) {
  return function(resolve, reject) {
    fetch(request)
      .then(contentType(type))
      .then(resolve)
      .catch(reject)
  }
}

class Ajax {
  constructor(url, options = {})  {
    this.url = url

    this.request = buildRequest(url, options)
    this.action = buildAction(this.request, options)

    this.promise = new Promise(this.action)
  }

  success(callback) {
    callback = this.onSuccess(callback)
    return this.then(callback)
  }

  then(callback) {
    this.promise.then(callback)
    return this
  }

  fail(callback) {
    callback = this.onFail(callback)
    return this.then(callback)
  }

  catch(callback) {
    callback = this.onError(callback)
    this.promise.catch(callback)
    return this
  }

  build() {
    return new Promise(this.promiseHandler)
  }

  promiseHandler = (resolve, reject) => {
    let action = this.buildAction(resolve, reject)
    action()
  }

  buildAction(resolve, reject) {
    let { type, headers, body } = options
    return () => {
      return fetch(this.url, this.options)
              .then(contentType(type))
              .then(resolve)
              .catch(reject)
    }
  }

}

export default Ajax
