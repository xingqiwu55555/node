const net = require('net');

const socket = new net.Socket({});

socket.connect({
  host: '127.0.0.1',
  port: 4000
});

// socket.write('good morning geekgang');

const LESSON_IDS = [
  "136797",
  "136798",
  "136799",
  "136800",
  "136801",
  "136803",
  "136804",
  "136806",
  "136807",
  "136808",
  "136809",
  "141994",
  "143517",
  "143557",
  "143564",
  "143644",
  "146470",
  "146569",
  "146582"
]

let index = Math.floor(Math.random() * LESSON_IDS.length);
let buffer = Buffer.alloc(4);

// 往服务器传数据
socket.write(encode(index));

socket.on('data', buffer => {
  console.log(LESSON_IDS[index], buffer.toString());

  // 接收到数据之后，按照半双工通信的逻辑，马上开始下一次请求
  index = Math.floor(Math.random() * LESSON_IDS.length);

  socket.write(encode(index));
});

// 把编码请求包的逻辑封装为一个函数
function encode(index) {
  buffer = Buffer.alloc(4);
  buffer.writeInt32BE(LESSON_IDS[index]);

  return buffer;
}