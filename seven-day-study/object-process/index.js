const main = (argv) => {
  console.log(a);
}

console.log(1111, process.argv.slice(0, 2));

try {
  // 出现错误
  main(process.argv.slice(2));
} catch (error) {
  // 0 是正常退出码，1 是错误退出码
  // pchildrocess.exit(0);

  // 标准输入流：stdin、一个标准输出流：stdout、一个标准错误流：stderr
  // 输出流示例
  process.stdout.write('error: there is a wrong');
}
