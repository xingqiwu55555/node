var bin = Buffer.from([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
console.log(111, bin); // <Buffer 68 65 6c 6c 6f>
console.log(bin[0], bin[1], bin[2], bin[4]);  // 104 101 十六进制转十进制
/*
6c
c * 16^0 = 12
6 * 16^1 = 96
12 + 96 = 108
*/

var str = bin.toString('utf-8');
console.log(222, str);  // hello

var bin = Buffer.from('hello', 'utf-8');
console.log(333, bin); // <Buffer 68 65 6c 6c 6f>

bin[0] = 0x48;
console.log(444, bin); // <Buffer 48 65 6c 6c 6f>

var str = bin.toString('utf-8');
console.log(555, str);  // Hello

var sub = bin.slice(2); // <Buffer 6c 6c 6f>
sub[0] = 0x65;
console.log(666, sub); // <Buffer 65 6c 6f>

var str = sub.toString('utf-8');
console.log(777, str);  // elo

