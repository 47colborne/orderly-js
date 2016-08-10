import Orderly from '../../dist'
import 'whatwg-fetch'

Orderly.debugMode(false)

let o = Orderly.start()

function randomInt(min, max) {
  return parseInt(Math.random() * (max - min)) + min
}

let randomPriorities = new Array(1000)
  .fill(undefined)

let url = 'http://jsonplaceholder.typicode.com/posts'

// BASIC CASE
// ==============================================

setTimeout(() => {
  randomPriorities.forEach((_, index) => {
    setTimeout(() => {
      o.get(url, {
        type: 'json',
        priority: randomInt(1, 10)
      })
       .success(resp => {
        // console.log('SUCCESS', resp.orderly_version.id)
      })
       .catch(err => {
        // console.log('ERROR!!!', err)
      })

    }, randomInt(0, 1000))

  })

}, randomInt(0, 1))

// setTimeout(() => {
//   randomPriorities.forEach((priority, index) => {
//     setTimeout(() => {

//       o.get('https://api.github.com/users', {
//         type: 'json',
//         priority: randomInt(1, 10)
//       })
//        // .cancel(resp => false)
//        .success(resp => {})
//        .fail(resp => {})
//        .catch(err => {})

//     }, randomInt(0, 2000))

//   })

// }, randomInt())


// VERSIONED CASE
// ==============================================

// setTimeout(() => {
//   randomPriorities.forEach((priority, index) => {
//     console.log('ok')
//     setTimeout(() => {
//       o.get('https://api.github.com/users', {
//         type: 'json',
//         priority: randomPriority()
//       })
//        .then(resp => console.log('complete'))
//        .catch(err => console.log(err))
//     }, randomInt(0, 2000))

//   })

// }, randomInt())

// CANCALLED CASE
// ==============================================
// let cancel = function() {
//   Math.floor(Math.random() * 2) == 0
// }

// setTimeout(() => {
//   randomPriorities.forEach((priority, index) => {
//     console.log('ok')
//     setTimeout(() => {
//       o.get('https://api.github.com/users', {
//         type: 'json',
//         priority: randomPriority(),
//         version: false,
//         cancel: cancel
//       })
//        .then(resp => console.log('complete'))
//        .catch(err => console.log(err))
//     }, randomInt(0, 2000))

//   })

// }, randomInt())
