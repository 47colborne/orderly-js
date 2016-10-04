import { src } from './path'

function filename(filePath) {
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

function build(definition = {}, stubs = {}) {
  return reduce(definition, function(map, name, path) {
    let stub = stubs[name]
    if (stub != null)
      map[path] = { ...map[path], [name]: stub }

    return map
  }, {})
}

function es6Require(path, map = {}) {
  let exportName = camelize(filename(path))
  return function(stubs = {}) {
    return src(path, build(map, stubs))[exportName]
  }
}

export { es6Require }
