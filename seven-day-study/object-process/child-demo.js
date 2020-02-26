const child_process = require('child_process');
const child = child_process.spawn('node', [ 'object-process/worker.js' ]);

console.log(123, child_process);demo

child.stdout.on('data', (data) => {
    console.log('stdout: ' + data);
});

child.stderr.on('data', (data) => {
    console.log('stderr: ' + data);
});

child.on('close', code => {
    console.log('child process exited with code ' + code);
});