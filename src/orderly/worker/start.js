import { cleanup } from './cleanup'
import { poll } from './poll'
import { sleep } from './sleep'

export function start(worker) {
  return sleep(cleanup(poll(worker)), start)
}
