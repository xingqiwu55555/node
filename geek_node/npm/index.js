const geektime = require('./lib')

geektime.addListener('newlesson', res => {
  if (res.price < 50) {
    console.log('buy!', res)
  }
})