// Ideals

Orderly.init("api")
  .map(task => {

  })


let task = Orderly.api(task => {
  $.get("http://www.example.com/api/search?q=wonder+woman", task.resolve)
  .fail(task.reject)
})

task.cancel()

task
  .then(parse)
  .then()
  .catch()
  .cancelIf(task => this.unmounted)
