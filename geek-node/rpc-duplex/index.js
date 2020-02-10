const buffer = Buffer.alloc(6);
buffer.writeInt16BE(0);
buffer.writeInt32BE('12111233', 2);

console.log(buffer);
console.log(buffer.slice(0, 2).readInt16BE());
console.log(buffer.readInt32BE(2));