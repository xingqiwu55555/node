const http = require('http');
const https = require('https');


// http 模块
http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text-plain' });
  response.end('Hello World\n');
}).listen(8124, () => {
  console.log('http server port: 8124.....');
});


// https 模块，多了一个options对象，通过 key 和 cert 字段指定了 HTTPS 服务器使用的私钥和公钥
// const options = {
//   key: fs.readFileSync('./ssl/default.key'),
//   cert: fs.readFileSync('./ssl/default.cer')
// };

// const server = https.createServer(options, (request, response) => {
//   response.writeHead(200, { 'Content-Type': 'text-plain' });
//   response.end('Hello World\n');
// });

// // 添加多组证书
// server.addContext('bar.com', {
//   key: fs.readFileSync('./ssl/bar.com.key'),
//   cert: fs.readFileSync('./ssl/bar.com.cer')
// });

// server.listen(8123, () => {
//   console.log('https server port: 8123.....');
// });
