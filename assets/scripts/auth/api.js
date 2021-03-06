'use strict';

const config = require('../config');
const store = require('../store');

const signUp = function(data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    data,
  });
};

const signIn = function(data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data,
  });
};

const changePassword = function(data) {
  return $.ajax({
    url: config.apiOrigin + '/change-password/' + store.user.id,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data,
  });
};

const signOut = function() {
  return $.ajax({
    url: config.apiOrigin + '/sign-out/' + store.user.id,
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${store.user.token}`
    }
  });
};


const createBoard = function() {
  return $.ajax({
    url: config.apiOrigin + '/games/',
    method: "POST",
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data: {
      game: {
        playerOneWon: false,
        playerTwoWon: false,
        over: false,
      }
    }
  });
};

const updateGame = function(id, playerOneStatus, playerTwoStatus, gameStatus) {
  return $.ajax({
    url: config.apiOrigin + `/games/${id}`,
    method: "PATCH",
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data: {
      game: {
        playerOneWon: playerOneStatus,
        playerTwoWon: playerTwoStatus,
        over: gameStatus,
      }
    }
  });
};


module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut,
  createBoard,
  updateGame,
};
