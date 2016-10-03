function nest(nextFunc, prevFunc) {
  return function(input) {
    return nextFunc(prevFunc(input))
  }
}

function immediateReturn(input) {
  return input
}

function buildPipe([ head, ...tail ], built = immediateReturn) {
  return head ? buildPipe(tail, nest(head, built)) : built
}

export function pipe(...actions) {
  return buildPipe(actions)
}

