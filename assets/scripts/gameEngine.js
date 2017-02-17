'use strict';

let board = [];
for (let i = 0; i < 49; i++) {
  board.push('');
}

let currentPlayer = 'o';
const changingTurns = function() {
  if (currentPlayer === 'x') {
    currentPlayer = 'o';
  } else if (currentPlayer === 'o') {
    currentPlayer = 'x';
  }
  return currentPlayer;
};

const selectSpace = function(i) {
  board[i] = changingTurns();
};

module.exports = {
  board,
  changingTurns,
  selectSpace,
};
