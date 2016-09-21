function init(execute, priority = 0) {
  if (typeof execute !== 'function')
    throw new TypeError('First argument in Job.init must an function')

  return { execute, priority }
}

export default { init }
