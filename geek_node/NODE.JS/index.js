console.log(process.argv)

var playerAction = process.argv[process.argv.length - 1];
console.log('你出了：' + playerAction)

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
  console.log('平局')
} else if (
  (playerAction === 'rock' && computerAction === 'scissor') ||
  (playerAction === 'scissor' && computerAction === 'paper') ||
  (playerAction === 'paper' && computerAction === 'rock')
) {
  console.log('你赢了')
} else {
  console.log('你输了')
}
