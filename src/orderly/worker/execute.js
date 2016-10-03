import { asyncCall } from '../lib'
import { run } from '../job'

export function execute(args = []) {
  asyncCall(run, 0, args)
}
