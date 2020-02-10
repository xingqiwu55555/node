const fs = require('fs');
const game = require('./game');
const koa = require('koa');
const mount = require('koa-mount');

let playerWonCount = 0;

let playerLastAction = null;

let sameCount = 0;

const app = new koa();

app.use(
  mount('/favicon.ico', (ctx) => {
    ctx.status = 200;
  })
)

const gameKoa = new koa();
gameKoa.use(
  async (ctx, next) => {
    if (playerWonCount >= 3) {
      ctx.status = 500;
      ctx.body = '再也不和你玩了！';
      return
    }

    await next();

    if (ctx.playerWon) {
      playerWonCount++
    }
  }
)
gameKoa.use(
  async (ctx, next) => {
    const query = ctx.query;
    const playerAction = query.action;

    if (!playerAction) {
      ctx.status = 400;
      return
    }

    if (sameCount == 9) {
      ctx.status = 500;
      ctx.body = '我不回再玩了！';
    }

    if (playerAction == playerLastAction) {
      sameCount++;
      if (sameCount >= 3) {
        ctx.status = 400;
        ctx.body = '你作弊！';
        sameCount = 9;
        return
      }
    } else {
      sameCount = 0;
    }

    playerLastAction = playerAction
    ctx.playerAction = playerAction
    await next()
  }
)
gameKoa.use(
  async (ctx, next) => {
    const playerAction = ctx.playerAction
    const gameResult = game(playerAction);

    await new Promise(resolve => {
      setTimeout(() => {
        ctx.status = 200;
  
        if (gameResult == 0) {
          ctx.body = '平局！';
        } else if (gameResult == -1) {
          ctx.body = '你输了！';
        } else {
          ctx.body = '你赢了！';
          ctx.playerWon = true;
        }

        resolve();
      }, 500)
    })
  }
)

app.use(
  mount('/game', gameKoa)
)

app.use(
  mount('/', (ctx) => {
    ctx.body = fs.readFileSync(__dirname + '/index.html', 'utf-8')
  })
)

app.listen(3000);