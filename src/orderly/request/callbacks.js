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

export { buildCallback, onCatch, onFail, onSuccess }