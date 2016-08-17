function getContentType(resp) {
  let ct = resp.headers.get('Content-Type')

  if (ct && ct.includes('application/json')) {
    return 'json'
  }

  return 'text'
}

function includeDataType(resp) {
  resp['_t'] = getContentType(resp)
  return resp
}

function convertDataType(resp) {
  return resp[resp._t]()
}

function includeAsData(resp) {
  return function(data) {
    resp['data'] = data
    return resp
  }
}

function contentType(resp) {
  return Promise.resolve(resp)
    .then(includeDataType)
    .then(convertDataType)
    .then(includeAsData(resp))
}

export default { contentType }