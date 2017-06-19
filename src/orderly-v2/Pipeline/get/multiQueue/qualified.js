import { all, not } from "../../../helpers/condition"

import maxed from "./maxed"

const notEmpty = not(queue => queue.empty())
const notMaxed = not(maxed)
const qualified = all(notMaxed, notEmpty)

export default qualified