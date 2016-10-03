export function discontinue(worker) {
  worker.continue = false
  return worker
}
