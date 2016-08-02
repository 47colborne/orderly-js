function bodyContainsJson(resp) {
  return resp._bodyBlob.type.includes('application/json')
}

function parseContentType(type) {
  return async function(resp) {
    if (type) {
      resp.data = await resp[type]()
    } else if (bodyContainsJson(resp)) {
      resp.data = await resp.json()
    }

    return resp
  }
}

function requestContentType(type) {
  return type ? {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  } : {}
}

export { bodyContainsJson, parseContentType, requestContentType }