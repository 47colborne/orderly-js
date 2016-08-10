const MIME_TYPE = {
  json: 'application/json'
}

function bodyContainsJson(resp) {
  let ct = resp.headers.get('Content-Type')
  return ct && ct.includes(MIME_TYPE.json)
}

function parseResponse(type, resolve, reject) {
  return function(resp) {
    if (!type && bodyContainsJson(resp))
      type = 'json'

    return resp[type]().then((data) => {
      resp['data'] = data
      return resp
    })
  }
}

function accepts(type) {
  if (type === 'json') return { 'Accept': MIME_TYPE.json }
}

function contentType(body, type) {
  if ((body && typeof body === 'object') || type === 'json' ) {
    return { 'Content-Type': MIME_TYPE.json }
  }
}

function requestContentType(body, type) {
  return Object.assign({}, accepts(type), contentType(body, type))
}

export { parseResponse, requestContentType }
