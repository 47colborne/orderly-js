// export default (function({ fetch }) {
//   let gitHubFetch = () => require('whatwg-fetch').fetch
//   let nodeFetch = () => require('node-fetch')
//   let polyfill = () => process ? nodeFetch() : gitHubFetch()

//   if (!fetch) {
//     window.fetch = fetch = polyfill()
//   }

//   return fetch
// })(window)