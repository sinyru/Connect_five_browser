'use strict';

// Created variable for the grid
let board = [];
for (let i = 0; i < 49; i++) {
  board.push('');
}

// Created variable for displaying whose turn it is
let currentPlayer = 'o';

// Created function for switching turns between players
const changingTurns = function() {
  if (currentPlayer === 'x') {
    currentPlayer = 'o';
  } else if (currentPlayer === 'o') {
    currentPlayer = 'x';
  }
  return currentPlayer;
};

// Created function for selecting spaces within the grid
const selectSpace = function(i) {
  if (board[i]===''){
    board[i] = changingTurns();
  } else {
    console.log('Pick another space!');
  }
};



module.exports = {
  board,
  changingTurns,
  selectSpace,
};
