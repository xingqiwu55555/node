const fs = require('fs');
const path = require('path');

// 格式化标准路径
console.log(path.normalize('foo/bar')); // foo/bar
console.log(path.normalize('foo//baz//../bar')); // foo/bar
console.log(path.normalize('foo/baz/../bar')); // foo/bar

// 拼接为标准路径
console.log(path.join('foo/', 'baz/', '../bar')); // foo/bar

// 获取文件扩展名
console.log(path.extname('foo/bar.js')); // .js

// * 遍历目录 *

/*
 * 递归算法
 * 遍历算法
 */

// 同步遍历
const syncTravel = (dir, callback) => {
  fs.readdirSync(dir).forEach(function (file) {
    var pathname = path.join(dir, file);

    if (fs.statSync(pathname).isDirectory()) {
      syncTravel(pathname, callback);
    } else {
      callback(pathname);
    }
  });
}


// 异步遍历
const asyncTravel = (dir, callback, finish) => {
  fs.readdir(dir, (err, files) => {
    (function next(i) {
      if (i < files.length) {
        var pathname = path.join(dir, files[i]);

        fs.stat(pathname, (err, stats) => {
          if (stats.isDirectory()) {
            asyncTravel(pathname, callback, () => {
              next(i + 1);
            });
          } else {
            callback(pathname, () => {
              next(i + 1);
            });
          }
        });
      } else {
        finish && finish();
      }
    }(0));
  });
}

console.log('-------------------------同步遍历目录----------------------');
syncTravel('../seven-day-study', console.log);
console.log('-------------------------异步遍历目录----------------------');
asyncTravel('../seven-day-study', (pathname, callback) => {
  console.log(pathname);
  callback();
}, () => { console.log('----------async travel finish----------'); });