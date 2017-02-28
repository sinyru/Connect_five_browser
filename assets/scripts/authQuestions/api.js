'use strict';

const config = require('../config');
const store = require('../store.js');

const createQuestion = function(data) {
  return $.ajax({
    url: config.apiOrigin + '/questions/',
    method: "POST",
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data
  });
};

const showQuestions = function() {
  return $.ajax({
    url: config.apiOrigin + '/questions/',
    method: 'GET',
  });
};

const showUserQuestions = function() {
  return $.ajax({
    url: config.apiOrigin + '/questions/',
    method: 'GET',
  });
};


const deleteQuestion = function(id) {
  return $.ajax({
    url: config.apiOrigin + '/questions/' + id,
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
  });
};

const getQuestion = function() {
  return $.ajax({
    url: config.apiOrigin + '/questions/' ,
    method: 'GET',
  });
};

const editAnswer = function(id, data) {
  return $.ajax({
    url: config.apiOrigin + '/questions/' + id,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data
  });
};

module.exports = {
  createQuestion,
  showQuestions,
  deleteQuestion,
  getQuestion,
  editAnswer,
  showUserQuestions,
};
