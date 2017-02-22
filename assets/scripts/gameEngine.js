'use strict';

const api = require('./auth/api.js');
const gameStore = require('./gameStore.js');

// Created variable for the grid
let gridSize = 25;
let winSize = 3;
let board = [];
let cellID = null;

for (let i = 0; i < gridSize; i++) {
  board.push('');
  $('.gameboard').append($('<div/>').attr("id", i).addClass("cells"));
}

// Created variable to hold the square root of the board length
const size = Math.sqrt(board.length);

// Created variable for displaying whose turn it is
let currentPlayer = 'x';

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

const shuffle = function(a) {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
};

const answerSet = function() {
  api.getQuestion()
    .then((response) => {
      gameStore.problem = response.question.problem;
      gameStore.correct = response.question.correct;
      gameStore.wrongOne = response.question.wrongOne;
      gameStore.wrongTwo = response.question.wrongTwo;
      gameStore.wrongThree = response.question.wrongThree;
    });
  let answer = [gameStore.correct, gameStore.wrongOne, gameStore.wrongTwo, gameStore.wrongThree];
  shuffle(answer);
  for (let i = 0; i < 4; i++) {
    $(`#ans${i}`).text(answer[i]);
  }
  $('h2').text(gameStore.problem);
};

// Reset function to reset board
const reset = function() {
  for (let i = 0; i < gridSize; i++) {
    board[i] = '';
    $('#' + i).text('');
  }
};

const onSpaceClick = function(event) {
  event.preventDefault;
  answerSet();
  cellID = parseInt(event.target.id);
  if (winConditions() === true) {
    $('#winner').text(`Winner is ${changingTurns()}`);
    $('.cells').unbind('click');
    $('.ans-cells').unbind('click');
  }
};

const onAnswerClick = function(event) {
  event.preventDefault;
  if ($(event.target).text() === gameStore.correct) {
    $(`#${cellID}`).text(currentPlayer);
    selectSpace(cellID);
    console.log(board);
  } else {
    changingTurns();
  }
};

const game = function() {
  reset();
  answerSet();
  $('.cells').on('click', onSpaceClick);
  $('.ans-cells').on('click', onAnswerClick);
};


const addHandlers = () => {
  $('#create-game').on('click', game);
};

module.exports = {
  addHandlers
};
