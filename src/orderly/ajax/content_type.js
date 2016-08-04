function bodyContainsJson(resp) {
  return resp._bodyBlob.type.includes('application/json')
}

async function responseContentType(resp, type) {
  if (type) {
    resp.data = await resp[type]()
  } else if (bodyContainsJson(resp)) {
    resp.data = await resp.json()
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
