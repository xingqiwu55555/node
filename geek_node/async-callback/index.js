// try {
//   interview(() => {
//     console.log('smile')
//   });
// } catch (e) {
//   console.log('cry', e);
// }

interview(res => {
  if (res instanceof Error) {
    console.log('cry')
  } else {
    console.log('smile')
  }
});



function interview(round) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.2) {
        resolve('success')
      } else {
        var error = new Error('fail');
        error.round = round;
        reject(round);
      }
    }, 500)
  })
}