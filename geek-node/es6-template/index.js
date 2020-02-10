let ejs = require('ejs');

const user = {
  name: '<script />'
}

const result = `<h2>${user.name}</h2>`
const vm = require('vm');

const templateMap = {
  templateA: '`<h2>${_(user.name)}</h2><div>${include("templateB")}</div>`',
  templateB: '`<p>haha haha</p>`'
}

const context = {
  user,

  // include 子模板
  include: function (name) {
    return templateMap[name]()
  },

  // 模板 helper 函数
  helper: function () {},

  // xss 过滤
  _: function (markup) {
    if (!markup) return '';
    return String(markup)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/'/g, '&#39;')
      .replace(/"/g, '&quot;');
  }
}

Object.keys(templateMap).forEach(key => {
  const temp = templateMap[key];

  templateMap[key] = vm.runInNewContext(`
    (function(){
      return ${temp}
    })
  `, context)
});

console.log(templateMap['templateA']());


// const template = '<h2><%= user.name %></h2>'
// ejs.render(template, { user })