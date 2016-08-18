function proxy(callback, ...args) {
  if (!callback) {
    return function(resp) {
      return resp
    }
  } else {
    return function(resp) {
      callback(...args)
      return resp
    }
  }
}

function catchProxy(callback, ...args) {
  if (!callback) {
    return function(err) {
      throw(err)
    }
  } else {
    return function(err) {
      callback(...args)
      throw(err)
    }
  }
}

function conditionalProxy(callback, condition) {
  return function(resp) {
    if (condition(resp)) callback(resp)
    return resp
  }
}

function onFail(callback) {
  return conditionalProxy(callback, resp => resp && resp.status >= 400)
}

function onSuccess(callback) {
  return conditionalProxy(callback, resp => resp && resp.status < 400)
}

export { proxy, catchProxy, conditionalProxy, onFail, onSuccess }
