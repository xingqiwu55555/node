## express 和 koa 中间件模式对比

本来想把源码拿出来进行讲解，看了 geek_node 后，有了另一番思考，我们应该考虑为何会有两者的区别，给几个示例代码：

#### 示例一
```
var express = require('express');

var app = express();
app.use(function (req, res, next) {
  console.log('第一个中间件start');
  next()
  console.log('第一个中间件end');
});
app.use(function (req, res, next) {
  console.log('第二个中间件start');
  next()
  console.log('第二个中间件end');
});
app.use('/foo', function (req, res, next) {
  console.log('接口逻辑start');
  next();
  console.log('接口逻辑end');
});
app.listen(4000);
``` 
运行的结果为：
```
第一个中间件start
第二个中间件start
接口逻辑start
接口逻辑end
第二个中间件end
第一个中间件end
```

#### 示例二
```
var express = require('express');

var app = express();
app.use(function (req, res, next) {
    console.log('第一个中间件start');
    setTimeout(() => {
        next();
    }, 1000)
    console.log('第一个中间件end');
});
app.use(function (req, res, next) {
    console.log('第二个中间件start');
    setTimeout(() => {
        next();
    }, 1000)
    console.log('第二个中间件end');
});
app.use('/foo', function (req, res, next) {
    console.log('接口逻辑start');
    next();
    console.log('接口逻辑end');
});
app.listen(4000);
```
运行结果为：
```
第一个中间件start
第一个中间件end
第二个中间件start
第二个中间件end
接口逻辑start
接口逻辑end
```

从上面的 示例一 和 示例二 的运行结果中我们可以看到，当我们的next 为异步行为时，其执行顺序会引发错误。express 团队也看到了此问题，所以他们开发了 koa，在 koa 中，上述的异步行为，会如何处理执行呢？

### 示例三
```
const Koa = require('koa');

const app = new Koa();

app.use(async (ctx, next) => {
  console.log('第一个中间件start');
  await next();
  console.log('第一个中间件end');
});

app.use(async (ctx, next) => {
  console.log('第二个中间件start');
  await next();
  console.log('第二个中间件end');
});

app.use(async ctx => {
  console.log('接口逻辑start');
  ctx.body = 'Hello World';
  console.log('接口逻辑end');
});

app.listen(3000);
```
运行结果为：
```
第一个中间件start
第二个中间件start
接口逻辑start
接口逻辑end
第二个中间件end
第一个中间件end
```
上面例子向我们展示了 koa 可以在异步行为中使用 async/await 来达到和同步行为的执行顺序一样，可能有人会疑惑我们为什么不在 express 异步行为中 使用 async/await？这就是问题所在，为什么不呢？这里有个误区，让我们以为使用 async/await 才是关键。这里我们得回到 express 和 koa 的中间件的源码上来看。

### 


