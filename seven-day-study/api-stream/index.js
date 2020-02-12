const fs = require('fs');

// .pipe 方法内部实现方式
const readStream = fs.createReadStream('./api-stream/students.json');
const writeStream = fs.createWriteStream('./api-stream/copy.json');

// const doSomething = (data, callback) => {
//   console.log(111, data);
//   callback();
// }

readStream.setEncoding('UTF8');

readStream.on('data', chunk => {
  // 模拟做某事
  // doSomething(chunk, () => {
  //   readStream.resume();
  // });

  if (writeStream.write(chunk) === false) {
    stream.pause();
  }
});

readStream.on('end', () => {
  console.log('end··········');
  writeStream.end();
});

writeStream.on('drain', function () {
  readStream.resume();
});
