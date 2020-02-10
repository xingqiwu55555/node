const fs = require('fs');
const game = require('./game');
const express = require('express');

let playerWonCount = 0;

let playerLastAction = null;

let sameCount = 0;

const app = express();

app.get('/favicon.ico', (request, response) => {
  response.status(200);
  return;
})

app.get('/game', 
  (request, response, next) => {
    if (playerWonCount >= 3 || sameCount == 9) {
      response.status(500);
      response.send('再也不和你玩了！');
      return
    }

    next();

    if (response.playerWon) {
      playerWonCount++
    }
  }, 
  (request, response, next) => {
    const query = request.query;
    const playerAction = query.action;

    if (!playerAction) {
      response.status(400);
      response.send();
      return
    }

    if (playerAction == playerLastAction) {
      sameCount++;
      if (sameCount >= 3) {
        response.status(400);
        response.send('你作弊！');
        sameCount = 9;
        return
      }
    } else {
      sameCount = 0;
    }

    playerLastAction = playerAction
    response.playerAction = playerAction
    next()
    
  },
  (request, response) => {
    const playerAction = response.playerAction
    const gameResult = game(playerAction);

    response.status(200);

    if (gameResult == 0) {
      response.send('平局！');
    } else if (gameResult == -1) {
      response.send('你输了！');
    } else {
      response.send('你赢了！');
      response.playerWon = true;
    }
  });

app.get('/', (request, response) => {
  response.send(fs.readFileSync(__dirname + '/index.html', 'utf-8'));
})

app.listen(3000);