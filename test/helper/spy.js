import sinon from 'sinon'

function spy(object, property, callback) {
  let original = object[property]
  let spy = sinon.spy()
  object[property] = spy
  callback.apply(null, [spy])
  object[property] = original
}

export { spy }
