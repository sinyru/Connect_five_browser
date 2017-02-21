'use strict';

// Created variable for the grid
let gridSize = 25;
let winSize = 3;
let board = [];

for (let i = 0; i < gridSize; i++) {
  board.push('');
  $('.gameboard').append($('<div/>').attr("id", i).addClass("cells"));
}

// Created variable to hold the square root of the board length
const size = Math.sqrt(board.length);

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
  if (board[i] === '') {
    board[i] = changingTurns();
  }
};

// Created variable to decide whether playerOne or playerTwo won.
let playerOne = false;
let playerTwo = false;

// Created function to decide Horizontal Winning Conditions
const winHorizontal = function() {
  let startPoint = 0;
  let endPoint = size;
  for (let j = 0; j < size; j++) {
    let result = [];
    for (let i = startPoint; i < endPoint; i++) {
      result.push(board[i]);
      if (result.length === winSize) {
        if (result.every((x) => x === 'x')) {
          playerOne = true;
          return true;
        } else if (result.every((x) => x === 'o')) {
          playerTwo = true;
          return true;
        } else {
          result.shift();
        }
      }
    }
    startPoint += size;
    endPoint += size;
  }
};

// Created function to decide Vertical Winning Conditions
const winVertical = function() {
  let startPoint = 0;
  let endPoint = size * (size - 1);
  for (let j = 0; j < size; j++) {
    let result = [];
    for (let i = startPoint; i <= endPoint; i += size) {
      result.push(board[i]);
      if (result.length === winSize) {
        if (result.every((x) => x === 'x')) {
          playerOne = true;
          return true;
        } else if (result.every((x) => x === 'o')) {
          playerTwo = true;
          return true;
        } else {
          result.shift();
        }
      }
    }
    startPoint++;
    endPoint++;
  }
};

const winConditions = function() {
  if (winHorizontal() === true ||
    winVertical() === true) {
    return true;
  } else {
    return false;
  }
};

// Reset function to reset board
const reset = function() {
  for (let i = 0; i < gridSize; i++) {
    board[i] = '';
    $('#' + i).text('');
  }

  $('.cells').on('click', (event) => {
    event.preventDefault();
    $('h2').text('');
    if ($(event.target).text() === "") {
      selectSpace(parseInt(event.target.id));
      $(event.target).text(currentPlayer);
    } else {
      $('h2').text('Space Picked!');
    }

    if (winConditions() === true) {
      $('h2').text(`Winner is ${currentPlayer}`);
      $('.cells').unbind('click');
    }
  });
};


const addHandlers = () => {
  $('#create-game').on('click', reset);
};

module.exports = {
  addHandlers
};
