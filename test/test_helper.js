// require and setup chai
import chai, { assert, expect } from 'chai'
import sinon from 'sinon'
import sinonChail from 'sinon-chai'

chai.use(sinonChail)

// path helper functions
import path, { join } from 'path'

let lib = (p) => require(join(__dirname, '..', p))
lib.src = (p) => lib(join('src', p))

// require and setup jsdom
let jsdom = require('jsdom')
global.document = jsdom.jsdom(
  '<!doctype html><html><body></body></html>'
)
global.window = document.defaultView
global.navigator = { userAgent: 'node.js' }

export { assert, expect, lib, sinon }
