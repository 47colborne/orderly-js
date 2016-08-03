let mode = false

function setMode(boolean) {
  return mode = boolean
}

function getMode() {
  return mode
}

function log(klass, action, ...args) {
  if (mode)
    console.log(`Orderly.${ klass } - ${ action } -`, ...args)
}

export { setMode, getMode, log }
