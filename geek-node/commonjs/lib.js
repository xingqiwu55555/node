module.exports = function (playerAction) {
  var random = Math.random() * 3;

  if (random < 1) {
    var computerAction = 'rock'
  } else if (random > 2) {
    var computerAction = 'scissor'
  } else {
    var computerAction = 'paper'
  }
  console.log('电脑出了：' + computerAction)

  if (playerAction === computerAction) {
    console.log('平局');
    return 0;

  } else if (
    (playerAction === 'rock' && computerAction === 'scissor') ||
    (playerAction === 'scissor' && computerAction === 'paper') ||
    (playerAction === 'paper' && computerAction === 'rock')
  ) {
    console.log('你赢了');
    return 1;
  } else {
    console.log('你输了');
    return -1;
  }

}