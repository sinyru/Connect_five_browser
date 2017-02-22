'use strict';

const indexQuestionsTemplate = require('../templates/indexQuestion.handlebars');

const indexSuccess = function(data) {
  let index = indexQuestionsTemplate({
    questions: data.questions
  });
  $('.question-index').empty().append(index);
};

const deleteSuccess = function() {
  $('.question-index').empty();
};

module.exports = {
  indexSuccess,
  deleteSuccess,
};
