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



function interview(callback) {
  setTimeout(() => {
    if (Math.random() < 0.6) {
      callback('success')
    } else {
      callback(new Error('fail'));
    }
  }, 500)
}