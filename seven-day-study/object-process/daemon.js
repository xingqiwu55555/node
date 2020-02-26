const child_process = require('child_process');
// 守护子进程

const spawn = mainModule => {
  const worker = child_process.spawn('node', [ mainModule ]);

  // 子进程正确的输出
  worker.stdout.on('data', (data) => {
    console.log('stdout: ' + data);
  });

  // 子进程出错的输出
  worker.stderr.on('data', (data) => {
    console.log('stderr: ' + data);
  });

  // 当子进程退出时，如果是由于出错而退出就重启子进程
  worker.on('exit', code => {
    if (code !== 0) {
      spawn(mainModule);
    }
  });
};

spawn('object-process/worker.js');