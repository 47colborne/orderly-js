function proxy(callback, ...args) {
  return function(resp) {
    callback(resp, ...args)
    return resp
  }
}

function proxyWithCondition(callback, condition) {
  return function(resp) {
    if (condition(resp)) resp = callback(resp)
    return resp
  }
}

function onFail(callback, cancelConditions) {
  return proxyWithCondition(callback, (resp) => resp.status >= 400)
}

function onSuccess(callback, cancelConditions) {
  return proxyWithCondition(callback, (resp) => resp.status < 400)
}

export { proxy, proxyWithCondition, onFail, onSuccess }