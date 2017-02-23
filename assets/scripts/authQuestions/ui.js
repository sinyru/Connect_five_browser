'use strict';

const indexQuestionsTemplate = require('../templates/indexQuestion.handlebars');

const indexSuccess = function(data) {
  let index = indexQuestionsTemplate({
    questions: data.questions
  });
  $('.question-index').empty().append(index);
  $('#close-questions').show();
  $('#show-questions').hide();
  $('#question-status').text("Please see below for Questions:");
};

const deleteSuccess = function() {
  $('.question-index').empty();
  $('#close-questions').hide();
  $('#show-questions').show();
  $('#question-status').text("Question has been deleted, please click button to check database.");
};

const editSuccess = function() {
  $('.question-index').empty();
  $('#close-questions').hide();
  $('#show-questions').show();
  $('#question-status').text("Answer has been edited, please click button to check database.");
};

const successCreateBoard = () => {
  $('h2').empty();
  $('.ans-cells').text("");
  $('.answers').show();
};

const successCreateQuestion = () => {
  $('#create-question-status').text("Question Created!");
};

const failureCreateQuestion = () => {
  $('#create-question-status').text("Fail to Create New Question. Please Fill in All Blanks");
};

module.exports = {
  indexSuccess,
  deleteSuccess,
  editSuccess,
  successCreateBoard,
  successCreateQuestion,
  failureCreateQuestion,
};
