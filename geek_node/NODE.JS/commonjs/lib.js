console.log('hello require')

exports.hello = 'world'

exports.obj = {
  name: 'jack',
  age: 22
}

module.exports = function minus(a, b) {
  return a - b
}

setTimeout(() => {
  console.log(exports)
}, 2000)
