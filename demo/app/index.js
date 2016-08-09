import Orderly from '../../dist'
import 'whatwg-fetch'
import './test'

let apiQ = Orderly.default.withOptions({ mode: 'cors', credentials: 'include' })

console.log(apiQ)