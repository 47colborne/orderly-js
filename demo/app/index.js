import Orderly from '../../dist'

let o = Orderly({ debug: true })

o.get('http://jsonplaceholder.typicode.com/posts')
 .then((resp) => console.log(resp))
