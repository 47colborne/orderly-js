import fetch from 'whatwg-fetch'
import Orderly from '../../dist'

let o = Orderly({  })

function randomPriority() {
  return Math.floor(Math.random() * 10)
}

function randomTimeout(base = 0, variance = 10) {
  return Math.floor(Math.random() * variance) + base
}

let randomPriorities = new Array(100)
  .fill()
  .map(randomPriority)


// BASIC CASE
// ==============================================

setTimeout(() => {
  randomPriorities.forEach((priority, index) => {
    setTimeout(() => {
      o.get('https://api.github.com/users', {
        type: 'json',
        priority: priority
      })
       .then(resp => console.log('complete'))
       .catch(err => {})
    }, randomTimeout())

  })

}, randomTimeout())

// setTimeout(() => {
//   randomPriorities.forEach((priority, index) => {
//     setTimeout(() => {

//       o.get('https://api.github.com/users', {
//         type: 'json',
//         version: true
//       })
//        .then(resp => console.log('complete', o.versioning.map))
//        .catch(err => console.log(err))

//     }, randomTimeout(0, 2000))

//   })

// }, randomTimeout())


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
//     }, randomTimeout(0, 2000))

//   })

// }, randomTimeout())

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
//     }, randomTimeout(0, 2000))

//   })

// }, randomTimeout())
