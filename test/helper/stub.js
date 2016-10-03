import { src } from './path'

function extractFilename(filePath) {
  return filePath.split('/').pop()
}

function camelize(string) {
  let [head, ...terms] = string.split('_')
  return [head, ...terms.map(capitalize)].join('')
}

function capitalize(string) {
  return string.slice(0, 1).toUpperCase() + string.slice(1)
}

function keys(object) {
  return Object.keys(object)
}

function reduce(object, callback, init) {
  return keys(object).reduce(function(sum, key) {
    return callback(sum, key, object[key])
  }, init)
}

function merge(definition = {}, stubs = {}) {
  return reduce(definition, function(map, name, path) {
    let filename = camelize(extractFilename(path))
    let stub = stubs[name]
    if (stub) {
      map[path] = { ...map[path], [name]: stub }
    }
    return map
  }, {})
}

function stub(filePath, definition = {}) {
  let name = camelize(extractFilename(filePath))
  return function(stubs = {}) {
    return src(filePath, merge(definition, stubs))[name]
  }
}

export { stub }
