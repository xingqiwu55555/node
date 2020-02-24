const http = require('http');
const zlib = require('zlib');

// 使用 zlib 模块压缩 HTTP 响应体数据的例子
http.createServer((request, response) => {
  var i = 1024,
      data = '';

  while (i--) {
      data += '.';
  }

  if ((request.headers['accept-encoding'] || '').indexOf('gzip') !== -1) {
      zlib.gzip(data, (err, data) => {
          response.writeHead(200, {
              'Content-Type': 'text/plain',
              'Content-Encoding': 'gzip'
          });
          response.end(data);
      });
  } else {
      response.writeHead(200, {
          'Content-Type': 'text/plain'
      });
      response.end(data);
  }
}).listen(8011, () => {
  console.log('server port: 8011');
});