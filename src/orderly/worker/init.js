export function init(queue, { sleep = 32, max = 8 } = {}) {
  if (!queue) throw new TypeError("Missing queue")

  return {
    queue, sleep, max,
    pending: 0,
    continue: true
  }
}
