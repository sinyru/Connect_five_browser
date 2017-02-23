'use strict';

const config = require('../config');

const createQuestion = function(data) {
  return $.ajax({
    url: config.apiOrigin + '/questions/',
    method: "POST",
    data
  });
};

const showQuestions = function() {
  return $.ajax({
    url: config.apiOrigin + '/questions/',
    method: 'GET',
  });
};

const deleteQuestion = function(id) {
  return $.ajax({
    url: config.apiOrigin + '/questions/' + id,
    method: 'DELETE'
  });
};

const getQuestion = function() {
  return $.ajax({
    url: config.apiOrigin + '/questions/' + Math.floor(Math.random() * 11 + 1),
    method: 'GET',
  });
};

const editAnswer = function(id, data) {
  return $.ajax({
    url: config.apiOrigin + '/questions/' + id,
    method: 'PATCH',
    data
  });
};

module.exports = {
  createQuestion,
  showQuestions,
  deleteQuestion,
  getQuestion,
  editAnswer,
};
