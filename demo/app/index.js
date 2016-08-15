import Orderly from '../../dist'
import 'whatwg-fetch'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

Orderly.debugMode(false)

let o = Orderly.start()

function randomInt(min, max) {
  return parseInt(Math.random() * (max - min)) + min
}

let url = 'http://jsonplaceholder.typicode.com/posts'

function getPosts(size, times, callback) {
  let n = 0
  while (n < times) {
    setTimeout(() => {
      new Array(size)
        .fill(undefined)
        .forEach((_, index) => {
          setTimeout(() => {
            o.get(url, {
              type: 'json',
              priority: randomInt(1, 10)
            })
            .success(resp => {
              callback(resp.data)
            })
            .fail(resp => {
              console.log('Request Failed')
            })
            .catch(err => {
              console.log('ERROR', err)
            })

          }, randomInt(0, 5000))
        })

    }, randomInt(0, 5000))
    n++
  }
}

class Post extends Component {
  render() {
    let { id, userId, title, body } = this.props.post
    return (
      <div className="post" id={ id }>
        <h3 className="title">{ title }</h3>
        <p className="body">{ body }</p>
      </div>
    )
  }
}

class Posts extends Component {

  constructor(props) {
    super(props)
    this.state = { posts: [] }
  }

  renderPosts() {
    return this.state.posts.map((post, index) => {
      return <Post key={ index } post={ post } />
    })
  }

  componentDidMount() {
    // getPosts(10, 10, (posts) => {
    //   console.log(posts);
    //   this.setState({
    //     posts: [...this.state.posts, ...posts]
    //   })
    // })
    let n = 0
    this.requests = []
    while (n < 100) {

      setTimeout(() => {
        let ajax = o.get(url, {
          type: 'json',
          priority: randomInt(1, 10)
        })
        .success(resp => {
          this.setState({
            posts: [...this.state.posts, ...resp.data]
          })
        })
        .then((resp) => {
          console.log('THEN', resp)
        })
        .fail(resp => {
          console.log('Request Failed')
        })
        .catch(err => {
          console.log('ERROR', err)
        })
        this.requests.push(ajax)

      }, randomInt(0, 2000))


      n++
    }
  }

  render() {
    return (
      <div id="posts">
        { this.renderPosts() }
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div id="app">
        <Posts />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)



// BASIC CASE
// ==============================================

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
