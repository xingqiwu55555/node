// 模拟时间循环伪代码

const eventloop = {
  queue: [],
  timeoutqueue: [],
  fsqueue: [],

  loop() {
    while (this.queue) {
      var callback = this.queue.shift();
      callback();
    }
    this.fsqueue.forEach(callback => {
      if (done) {
        callback()
      }
    });

    setTimeout(this.loop.bind(this), 50);
  },

  add(callback) {
    this.queue.push(callback);
  }
}

eventloop.init();

setTimeout(() => {
  eventloop.add('fswrite', () => {
    console.log(1);
  })
}, 500)

setTimeout(() => {
  eventloop.add(() => {
    console.log(2);
  })
}, 800)

