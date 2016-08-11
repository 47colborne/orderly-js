function proxy(callback, ...args) {
  return function(resp) {
    callback(resp, ...args)
    return resp
  }
}

function conditionProxy(callback, condition) {
  return function(resp) {
    if (condition(resp)) callback(resp)
    return resp
  }
}

function onFail(callback) {
  return conditionProxy(callback, resp => resp.status >= 400)
}

function onSuccess(callback) {
  return conditionProxy(callback, resp => resp.status < 400)
}

export { proxy, conditionProxy, onFail, onSuccess }
