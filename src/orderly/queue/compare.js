import { id, priority as p } from '../job'
import { equal as eq, lessThan as lt } from '../lib'

export function compare(x, y) {
  return (eq(p(x), p(y)) && lt(id(x), id(y))) || lt(p(y), p(x))
}
