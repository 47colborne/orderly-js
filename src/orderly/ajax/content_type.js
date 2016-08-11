
const MIME_TYPES = {
  json: 'application/json'
}

function bodyContainsJson(resp) {
  let ct = resp.headers.get('Content-Type')
  return ct && ct.includes(MIME_TYPES.json)
}

function includeData(resp) {
  return function(data) {
    resp['data'] = data
    return resp
  }
}

function includeType(type) {
  return function(resp) {
    if (!type)
      type = bodyContainsJson(resp) ? 'json' : 'text'

    resp['orderly_type'] = type
    return resp
  }
}

function convertType(resp) {
  return resp[resp.orderly_type]()
}

function parseResponse(type) {
  return function(resp) {
    return Promise.resolve(resp)
      .then(includeType(type))
      .then(convertType)
      .then(includeData(resp))
  }
}

function accepts(type) {
  if (type === 'json') return { 'Accept': MIME_TYPES.json }
}

function contentType(body, type) {
  if (type === 'json' || (typeof body === 'object'))
    return { 'Content-Type': MIME_TYPES.json }
}

function requestContentType(body, type) {
  return Object.assign({}, accepts(type), contentType(body, type))
}

export { parseResponse, requestContentType }
