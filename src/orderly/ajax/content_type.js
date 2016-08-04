function bodyContainsJson(resp) {
  return resp._bodyBlob.type.includes('application/json')
}

function responseContentType(type) {
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
  if (type) {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
}

export { bodyContainsJson, responseContentType, requestContentType }
