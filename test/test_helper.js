// require and setup chai
import chai, { assert, expect } from 'chai'
import sinon from 'sinon'
import sinonChail from 'sinon-chai'
import { noPreserveCache } from 'proxyquire'

let proxyquire = noPreserveCache()

chai.use(sinonChail)

// path helper functions
import path, { join } from 'path'

let lib = (p, o = {}) => proxyquire(join(__dirname, '..', p), o)
lib.src = (p, o) => lib(join('src', p), o)

// require and setup jsdom
let jsdom = require('jsdom')
global.document = jsdom.jsdom(
  '<!doctype html><html><body></body></html>'
)
global.window = document.defaultView
global.navigator = { userAgent: 'node.js' }

// require fetch
let fetch = require('node-fetch')
global.fetch = fetch

function spy(object, func, callback) {
  let backup = object[func]
  callback(object[func] = sinon.spy())
  object[func] = backup
}

export { assert, expect, lib, sinon, spy }
