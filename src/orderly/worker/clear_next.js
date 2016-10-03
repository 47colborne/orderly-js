export function clearNext(worker) {
  worker.next = clearTimeout(worker.next)
  return worker
}
