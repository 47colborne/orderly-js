import fetch from 'whatwg-fetch'
import Orderly from '../dist'

let o = Orderly({ debug: true })

function randomPriority() {
  return Math.floor(Math.random() * 10)
}

function randomInt(base = 0, variance = 10) {
  return Math.floor(Math.random() * variance) + base
}

let randomPriorities = new Array(100)
  .fill()
  .map(randomPriority)


// BASIC CASE
// ==============================================

// setTimeout(() => {
//   randomPriorities.forEach((priority, index) => {
//     setTimeout(() => {
//       o.get('https://api.github.com/users', {
//         type: 'json',
//         priority: priority
//         // version: false
//       })
//        .cancel(resp => false)
//        .then(resp => console.log('complete', resp.version))
//        .catch(err => console.log('ERROR!!!', err))

//     }, randomInt())

//   })

// }, randomInt())

setTimeout(() => {
  randomPriorities.forEach((priority, index) => {
    setTimeout(() => {

      o.get('https://api.github.com/users', {
        type: 'json',
        priority: randomInt(1, 10)
      })
       // .cancel(resp => false)
       .success(resp => {})
       .fail(resp => {})
       .catch(err => {})

    }, randomInt(0, 2000))

  })

}, randomInt())


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

