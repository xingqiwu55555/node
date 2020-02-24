const net = require('net');

const options = {
  port: 8011,
  host: '127.0.0.1'
};

const client = net.connect(options, () => {
  client.write([
      'GET / HTTP/1.1',
      'User-Agent: curl/7.26.0',
      'Host: www.baidu.com',
      'Accept: */*',
      '',
      ''
  ].join('\n'));
});

client.on('data', data => {
  console.log(data.toString()); 
  client.end();
});