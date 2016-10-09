export function initCounter() {
  let counter = 0
  return function() {
    return counter += 1
  }
}
