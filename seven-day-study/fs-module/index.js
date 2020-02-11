const fs = require('fs');

const copy = (src, dst) => {
  // 同步步小文件拷贝 --- 从源路径读取文件内容，然后把文件内容写入目标路径
  fs.writeFileSync(dst, fs.readFileSync(src));

  // 同步大文件拷贝 --- 用文件流的方法，读一点写一点的方式
  // fs.createReadStream(src).pipe(fs.createWriteStream(dst));

  // 异步拷贝
  // fs.readFile(src, (err, data) => {
  //   if (err) {
  //     return console.error(err);
  //   }
  //   console.log("异步读取: " + data);
  // });
}

const main = argv => {
  copy(argv[0], argv[1]);
}

const MAIN_MODULE_PATH = process.argv[1];
console.log(111, MAIN_MODULE_PATH);

main([`${MAIN_MODULE_PATH}/source.json`, `${MAIN_MODULE_PATH}/copy.json`]);