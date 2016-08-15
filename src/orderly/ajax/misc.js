import { log } from '../debug'

function debugLogger(action, { id, key: url }, priority) {
  log('Orderly', action, { url, id, priority })
}

export { debugLogger }