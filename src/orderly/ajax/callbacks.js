function buildCallback(callback, condition) {
  return function(resp) {
    if (condition(resp)) {
      resp = callback(resp)
    }

    return resp
  }
}

function onFail(callback, cancelConditions) {
  return buildCallback(callback, (resp) => resp.status >= 400)
}

function onSuccess(callback, cancelConditions) {
  return buildCallback(callback, (resp) => resp.status < 400)
}

export { buildCallback, onFail, onSuccess }