'use strict';

const api = require('./auth/api.js');
const gameStore = require('./gameStore.js');
const store = require('./store.js');
const apiQuestion = require('./authQuestions/api.js');

// Created variable for the grid
let gridSize = 25;
let winSize = 3;
let board = [];
let cellID = null;
let answers = [];
let correctAnswer = '';
let problem = '';

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
  apiQuestion.getQuestion()
    .then((response) => {
      gameStore.problem = response.question.problem;
      gameStore.correct = response.question.correct;
      gameStore.wrongOne = response.question.wrongOne;
      gameStore.wrongTwo = response.question.wrongTwo;
      gameStore.wrongThree = response.question.wrongThree;
    });
  answers = [gameStore.correct, gameStore.wrongOne, gameStore.wrongTwo, gameStore.wrongThree];
  correctAnswer = gameStore.correct;
  problem = gameStore.problem;
  shuffle(answers);
  for (let i = 0; i < 4; i++) {
    $(`#ans${i}`).text(answers[i]);
  }
  $('h2').text(problem);
};

// Reset function to reset board
const reset = function() {
  for (let i = 0; i < gridSize; i++) {
    board[i] = '';
    $('#' + i).text('');
  }
};

const onSpaceClick = function(event) {
  event.preventDefault();
  cellID = parseInt(event.target.id);
  answerSet();
  if (winConditions() === true) {
    $('#winner').text(`Winner is ${changingTurns()}`);
    $('.cells').unbind('click');
    $('.ans-cells').unbind('click');
    api.updateGame(store.id, playerOne, playerTwo, true);
  }

};

const onAnswerClick = function(event) {
  event.preventDefault();
  console.log($(event.target).text());
  if ($(event.target).text() === correctAnswer) {
    $(`#${cellID}`).text(currentPlayer);
    selectSpace(cellID);
  } else {
    changingTurns();
  }
};

const game = function() {
  answerSet();
  reset();
  api.createBoard()
    .then((response) => {
      store.id = response.game.id;
      return store;
    });
  console.log(store);
  $('.ans-cells').on('click', onAnswerClick);
  $('.cells').on('click', onSpaceClick);
};


const addHandlers = () => {
  $('#create-game').on('click', game);
};

module.exports = {
  addHandlers
};
