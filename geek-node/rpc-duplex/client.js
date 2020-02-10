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
let seq = 0;

socket.on('data', buffer => {
  const seqBuffer = buffer.slice(0, 2);
  const titleBuffer = buffer.slice(2);

  console.log(seqBuffer.readInt16BE, titleBuffer.toString());

  // 接收到数据之后，按照半双工通信的逻辑，马上开始下一次请求
  index = Math.floor(Math.random() * LESSON_IDS.length);

  socket.write(encode(index));
});

// 把编码请求包的逻辑封装为一个函数
function encode(index) {
  buffer = Buffer.alloc(6);
  buffer.writeInt16BE(seq);
  buffer.writeInt32BE(LESSON_IDS[index], 2);

  console.log(seq, LESSON_IDS[index]);
  seq++;

  return buffer;
}

// 往服务器传数据
// 模拟乱序，全工通信
// setInterval(() => {
//   index = Math.floor(Math.random() * LESSON_IDS.length);
//   socket.write(encode(index));
// }, 50)

// 同时发送 100 个包，只接收到一个返回，tcp自动拼接，粘包到一起优化性能
for (let k = 0; k < 100; k++) {
  index = Math.floor(Math.random() * LESSON_IDS.length);
  socket.write(encode(index));
}