// require and setup chai
import chai, { assert, expect } from 'chai'
import sinon from 'sinon'
import sinonChail from 'sinon-chai'

chai.use(sinonChail)

// require helpers
import * as path from './helper/path'
import { spy } from './helper/spy'
import { es6Require } from './helper/es6_require'

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

export { assert, expect, sinon, path, spy, es6Require }
