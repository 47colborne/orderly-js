// require and setup chai
import chai, { assert, expect } from 'chai'
import sinon from 'sinon'
import sinonChail from 'sinon-chai'

chai.use(sinonChail)

// path helper functions
import path from 'path'

let lib = (p) => require(path.join(__dirname, '..', p)).default
lib.src = (p) => lib(path.join('src', p))

// require and setup jsdom
let jsdom = require('jsdom')
global.document = jsdom.jsdom(
  '<!doctype html><html><body></body></html>'
)
global.window = document.defaultView
global.navigator = { userAgent: 'node.js' }

export { assert, expect, lib, sinon }
