(function(){
  /*
  var promise = interview();
  var promise2 = promise
    .then(res => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('accept')
        }, 400)
      })
      // console.log('smile')
      // return new Error('refuse')
    })

  setTimeout(() => {
    console.log(promise);
    console.log(promise2);
  }, 800)

  setTimeout(() => {
    console.log(promise);
    console.log(promise2);
  }, 1000)
  */

  /** 
  var promise = interview(1)
    .then(() => {
      return interview(2);
    })
    .then(() => {
      return interview(3);
    })
    .then(() => {
      console.log('smile');
    })
    .catch(err => {
      console.log('cry at ' + err.round + ' round');
    })
  **/

  Promise
    .all([interview('geekgang'), interview('tencent')])
    .then(() => {
      console.log('smile');
    })
    .catch(err => {
      console.log('cry for ' + err.name);
    })

  function interview(name) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.2) {
          resolve('success')
        } else {
          var error = new Error('fail');
          error.name = name;
          reject(name);
        }
      }, 500)
    })
  }
})();
