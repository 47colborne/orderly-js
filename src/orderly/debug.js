let mode = false

function setMode(boolean) {
  return mode = boolean
}

function getMode() {
  return mode
}

function log(klass, action, args = {}) {
  if (mode) {
    let msg = Object.keys(args).reduce((msg, key) => {
      let value = args[key]
      if (typeof value === 'object') value = JSON.stringify(value)
      return `${ msg } ${ key }:${ value }`
    }, klass)

    msg = msg + ' ' + action

    console.log(msg)
  }
}

export { setMode, getMode, log }
