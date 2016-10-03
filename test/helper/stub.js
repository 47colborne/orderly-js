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

function reduce(object, callback, init = {}) {
  return keys(object).reduce(function(sum, key) {
    return callback(sum, key, object[key])
  }, init)
}

function subMerge(defaultMap = {}, customMap = {}) {
  return reduce(defaultMap, function(map, key, val) {
    let name = camelize(filename(key))
    return { ...map,
      [key]: customMap[name] || defaultMap[key]
    }
  })
}

function sub(key, value) {
  return { [key]: value }
}

function merge(defaultMap = {}, customMap = {}) {
  return reduce(defaultMap, function(map, key, val) {
    let name = camelize(filename(key))
    return { ...map,
      [key]: (
        typeof val === 'object' ?
        subMerge(val, customMap[name]) :
        sub(name, customMap[name] || val)
      )
    }
  })
}

function stub(filePath, defaultMap = {}) {
  let name = camelize(filename(filePath))
  return function(customMap = {}) {
    let stub = merge(defaultMap, customMap)
    return src(filePath, stub)[name]
  }
}

export { stub }
