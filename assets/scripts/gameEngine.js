'use strict';

const api = require('./auth/api.js');
const gameStore = require('./gameStore.js');
const store = require('./store.js');
const apiQuestion = require('./authQuestions/api.js');
const ui = require('./authQuestions/ui.js');

// Created variable for the grid
let gridSize = 25;
let winSize = 3;
let board = [];
let cellID = null;
let cellStatus = '';
let answers = [];
let correctAnswer = '';
let randomQuestion = '';
let questions = [];

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
    board[i] = currentPlayer;
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
  $('.ans-cells').hide();
  apiQuestion.getQuestion()
    .then((response) => {
      questions = response.questions;
      shuffle(questions);
      gameStore.problem = questions[0].problem;
      gameStore.correct = questions[0].correct;
      gameStore.wrongOne = questions[0].wrongOne;
      gameStore.wrongTwo = questions[0].wrongTwo;
      gameStore.wrongThree = questions[0].wrongThree;
    });
  answers = [gameStore.correct, gameStore.wrongOne, gameStore.wrongTwo, gameStore.wrongThree];
  correctAnswer = gameStore.correct;
  randomQuestion = gameStore.problem;

  shuffle(answers);
  for (let i = 0; i < 4; i++) {
    $(`#ans${i}`).text(answers[i]);
  }

};

// Reset function to reset board
const reset = function() {
  for (let i = 0; i < gridSize; i++) {
    board[i] = '';
    $('#' + i).text('');
  }
  $('h2').text('New Game! Player X, please pick a spot to begin.');
  currentPlayer='x';
  playerOne=false;
  playerTwo=false;
};

const onSpaceClick = function(event) {

  event.preventDefault();
  cellID = parseInt(event.target.id);
  cellStatus = $(event.target).text();
  $('h2').text('Question: ' + gameStore.problem);

  if (cellStatus === '') {
    answerSet();
    if (winConditions() === false){
      $('.ans-cells').show();}
    $('.cells').unbind('click');
  } else {
    $('h2').text("Pick Another Space!");
    $('.ans-cells').hide();
  }

};

const onAnswerClick = function(event) {
  event.preventDefault();
  if ($(event.target).text() === correctAnswer) {
    $(`#${cellID}`).text(currentPlayer);
    selectSpace(cellID);
    if (winConditions() === true) {
      $('#winner').text(`Winner is ${currentPlayer.toUpperCase()}`);
      $('.cells').unbind('click');
      $('.ans-cells').unbind('click');
      $('h2').hide();
      $('.ans-cells').hide();
      api.updateGame(store.id, playerOne, playerTwo, true);
    }
    changingTurns();
    $('h2').text(`Correct!, ${currentPlayer.toUpperCase()}'s Turn Now`);
    $('.ans-cells').hide();
  } else {
    changingTurns();
    $('h2').text(`Wrong! ${currentPlayer.toUpperCase()}'s Turn`);
    $('.ans-cells').hide();
  }
  $('.cells').on('click', onSpaceClick);
};

const game = function(event) {
  event.preventDefault();
  $('.cells').off('click');
  $('.ans-cells').off('click');
  $('#show-questions').hide();
  $('#show-user-questions').hide();
  $('.btn-change-password').hide();
  $('.btn-create-question').hide();
  $('#close-game').show();

  reset();
  answerSet();

  api.createBoard()
    .then((response) => {
      store.id = response.game.id;
      return store;
    })
    .then(ui.successCreateBoard);
  $('h2').show();
  $('#winner').empty();

  $('.cells').on('click', onSpaceClick);
  $('.ans-cells').on('click', onAnswerClick);
};


const addHandlers = () => {
  $('#create-game').on('click', game);
};

module.exports = {
  addHandlers
};
