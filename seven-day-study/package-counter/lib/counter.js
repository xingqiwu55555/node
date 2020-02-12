var i = 0;

const increase = () => ++i;

const decrease = () => --i;

// 添加模块默认导出对象的属性
// exports.increase = increase;
// exports.decrease = decrease;

// 模块默认导出对象被替换为一个对象
module.exports = {
  increase,
  decrease
}

// 模块默认导出对象被替换为一个函数
// module.exports = () => {}