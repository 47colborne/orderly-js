function accepts(type) {
  if (type === 'json')
    return { 'Accept': 'application/json' }
}

function contentType(body, type) {
  if (typeof body === 'object' || type === 'json')
    return { 'Content-Type': 'application/json' }
}

export default { contentType, accepts }