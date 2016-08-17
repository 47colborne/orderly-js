function proxy(callback, ...args) {
  if (!callback) callback = () => {}
  return function(resp) {
    callback(resp, ...args)
    return resp
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

export { proxy, conditionalProxy, onFail, onSuccess }
