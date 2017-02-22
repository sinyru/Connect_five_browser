'use strict';

const api = require('./api.js');
const getFormFields = require(`../../../lib/get-form-fields`);
const ui = require('./ui.js');

const onCreateQuestion = function(event) {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.createQuestion(data);
};

const onShowQuestion = function() {
  api.showQuestions()
    .then(ui.indexSuccess);
};

const onDeleteQuestion = function(event) {
  event.preventDefault();
  let id = event.target.dataset.id;
  console.log(id);
  api.deleteQuestion(id)
  .then(ui.deleteSuccess);
};


const addHandlers = () => {
  $('#create-question').on('submit', onCreateQuestion);
  $('#show-questions').on('click', onShowQuestion);
  $('.question-index').on('click', '.remove-question', onDeleteQuestion);
};

module.exports = {
  addHandlers
};
