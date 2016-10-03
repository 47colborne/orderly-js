import { asyncCall } from '../lib'

export function sleep(worker, next) {
  if (worker.continue)
    worker.next = asyncCall(next, worker.sleep, [worker])
  return worker
}
