const MIME_TYPE = {
  json: 'application/json'
}

function bodyContainsJson(resp) {
  let ct = resp.headers.get('Content-Type')
  return ct && ct.includes(MIME_TYPE.json)
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

export { bodyContainsJson, requestContentType }
