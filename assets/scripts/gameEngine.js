'use strict';

const api = require('./auth/api.js');
const config = require('./config');
const store = require('./store.js');
const gameStore = require('./gameStore.js');
const ui = require('./auth/ui.js');

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

const rightAnswer = function() {
  api.getQuestion()
    .then((response) => {
      gameStore.problem = response.question.problem;
      gameStore.correct = response.question.correct;
      gameStore.wrongOne = response.question.wrongOne;
      gameStore.wrongTwo = response.question.wrongTwo;
      gameStore.wrongThree = response.question.wrongThree;
      return gameStore;
    });
  let answers = [gameStore.correct, gameStore.wrongOne, gameStore.wrongTwo, gameStore.wrongThree];
  answers.sort(() => 0.5 - Math.random());
  for (let i = 0; i < 4; i++) {
    $(`#ans${i+1}`).text(answers[i]);
  }
  return answers;
};

const choosingAnswer = function(textSelected, id) {
  $('.answers').on('click', (event) => {
    event.preventDefault();

    if ($(event.target).text() === gameStore.correct) {
      if (textSelected.text() === "") {
        selectSpace(parseInt(id));
        textSelected.text(currentPlayer);
        $('h2').text('Correct!');
      }
    } else {
      changingTurns();
      $('h2').text('Wrong!');
    }
  });
};

// Reset function to reset board
const reset = function() {
  for (let i = 0; i < gridSize; i++) {
    board[i] = '';
    $('#' + i).text('');
  }

  $('.cells').on('click', (event) => {
    event.preventDefault();
    let id = parseInt(event.target.id);
    let textSelected = $(event.target);
    rightAnswer();
    $('h3').text((gameStore.problem));
    $('h2').text('');
    choosingAnswer(textSelected, id);
    if (winConditions() === true) {
      $('#winner').text(`Winner is ${currentPlayer.toUpperCase()}`);
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
