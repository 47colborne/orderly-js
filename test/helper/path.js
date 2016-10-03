import path, { join } from 'path'
import { noPreserveCache } from 'proxyquire'

let proxyquire = noPreserveCache()

function resolve(child, parent) {
  if (!parent) parent = resolve('../../', __dirname)
  return join(parent, child)
}

function lib(filePath, stub = {}) {
  return proxyquire(resolve(filePath), stub)
}

function src(filePath, stub = {}) {
  return lib(resolve(filePath, 'src'), stub)
}

function orderly(filePath, stub = {}) {
  return src(resolve(filePath, 'orderly'), stub)
}

export { lib, src, orderly }
