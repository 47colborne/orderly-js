let build = function(initialValue = 0) {
  return {__default__: initialValue }
}

let get = function(versions, key)  {
  return versions[key] || versions.__default__
}

let inc = function(versions, key) {
  return get(versions, key) + 1
}

let set = function(versions, key, value) {
  return { ...versions, [key]: value }
}

let setDefault = function(versions, value) {
  return set(versions, '__default__', value)
}

export default { build, get, inc, set, setDefault }