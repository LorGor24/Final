var board;
const human ='O';
const computer = 'X';


const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]
]

const cells = document.querySelectorAll('.cell');
start();


function start() {
  document.querySelector('.finishGame').style.display = 'none';
  board = Array.from(Array(9).keys());

  for(var i = 0; i < cells.length; i++){
    cells[i].innerText = '';
    cells[i].style.removeProperty('background-color');
    cells[i].addEventListener('click', turnClick, false);
  }
}

function turnClick(box) {
  if (typeof board[box.target.id] == 'number'){
    turn(box.target.id, human)
    if(!checkTie()) turn(bestSpot(), computer);
  }
}

function turn(boxId, player){
  board[boxId] = player;
  document.getElementById(boxId).innerText = player;
  let win = checkWin(board, player)
  if(win) gameOver(win)
}

function checkWin(newBoard, player){
  let plays = newBoard.reduce((a, e, i) =>
    (e === player) ? a.concat(i) : a, [])
  let win = null;
  for (let[index, won] of winCombos.entries()) {
    if (won.every(elem => plays.indexOf(elem) > -1)) {
      win = {index: index, player: player};
      break;
    }
  }
  return win;
}

function gameOver(win) {
  for(let index of winCombos[win.index]) {
    document.getElementById(index).style.backgroundColor =
    win.player == human ? "green" : "yellow";
  }

  for (var i = 0; i < cells.length; i++){
    cells[i].removeEventListener('click', turnClick, false);
  }
  declareWinner(win.player == human ? "you win!" : "you lose")
}

function declareWinner(who) {
  document.querySelector('.finishGame').style.display = 'block';
  document.querySelector('.finishGame .text').innerText = who;
}

function emptySquares(){
  return board.filter(s => typeof s == 'number');
}

function bestSpot(){
  return emptySquares()[0];

}

function checkTie() {
  if (emptySquares().length == 0) {
    for (var i = 0; i < cells.length; i++){
      cells[i].style.backgroundColor = 'blue';
      cells[i].removeEventListener('click', turnClick, false);
    }

    declareWinner('Tie Game!')
    return true;
  }
  return false;
}
