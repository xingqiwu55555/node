const fs = require('fs');
const iconvLite = require('iconv-lite');

const readText = pathname => {
  var bin = fs.readFileSync(pathname);

  // 去除 UTF8 带有 BOM
  if (bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF) {
    console.log(11111);
    bin = bin.slice(3);
  }

  return bin.toString('utf-8');
}

const readGBKText = pathname => {
  var bin = fs.readFileSync(pathname);

  return iconvLite.decode(bin, 'gbk');
}

console.log('result: ', readText('./text-encode/utf8.txt'));
console.log('result: ', readGBKText('./text-encode/gbk.txt'));
