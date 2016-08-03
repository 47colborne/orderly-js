function bodyContainsJson(resp) {
  return resp._bodyBlob.type.includes('application/json')
}

function parse(type) {
  return async function(resp) {
    if (type) {
      resp.data = await resp[type]()
    } else if (bodyContainsJson(resp)) {
      resp.data = await resp.json()
    }

    return resp
  }
}

function request(type) {
  if (type) {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
}

export default { bodyContainsJson, parse, request }
