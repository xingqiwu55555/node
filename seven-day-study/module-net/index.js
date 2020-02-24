const net = require('net');

net.createServer(conn => {
  conn.on('data', data => {
      conn.write([
          'HTTP/1.1 200 OK',
          'Content-Type: text/plain',
          'Content-Length: 11',
          '',
          'Hello World'
      ].join('\n'));
  });
}).listen(8011, () => {
  console.log('server port: 8011');
});