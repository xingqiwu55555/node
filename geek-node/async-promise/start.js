(function(){
  var promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(3);
    }, 300)

    setTimeout(() => {
      // resolve();
      reject(new Error());
    }, 500)

  }).then(res => {
    console.log('res', res)
  }).catch(err => {
    console.log('error', err);
  })

  console.log(promise);

  setTimeout(() => {
    console.log(promise)
  }, 800)
})();