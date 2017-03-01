'use strict';

const indexQuestionsTemplate = require('../templates/indexQuestion.handlebars');
const gameStore = require('../gameStore.js');
const store = require('../store.js');


const indexSuccess = function(data) {
  let index = indexQuestionsTemplate({
    questions: data.questions
  });

  $('.question-index').empty().append(index);
  $('#close-questions').show();
  $('#show-questions').hide();
  $('#question-status').text("Please see below for Questions:");
  $('#show-user-questions').hide();
  $('#create-game').hide();
};

const showUserQuestionsSuccess = function() {
  let size = gameStore.user.questions.length;
  let count = 0;
  for (let i = 0; i < size; i++) {
    if (gameStore.user.questions[i].user_id === store.user.id) {
      $('.question-index').append("Problem: " + gameStore.user.questions[i].problem + `
                                    <button data-id=${gameStore.user.questions[i].id}
                                    class="remove-question">Delete</button>` + "<br>");
      $('.question-index').append("Correct: " + gameStore.user.questions[i].correct + `
                                    <form class="edit-question" data-id=${gameStore.user.questions[i].id}>
                                    <input type="text" name="question[correct]">
                                    <input type="submit" value="Change Answer">
                                    </form>` + "<br>");
      count++;
    }
  }
  if (count === 0)
    $('h2').text("You have no Questions in database");

  $('#show-user-questions').hide();
  $('#close-user-questions').show();
  $('#show-questions').hide();
  $('#create-game').hide();
};

const deleteSuccess = function() {
  $('.question-index').empty();
  $('#close-questions').hide();
  $('#question-status').text("Question Deleted.");
};

const editSuccess = function() {
  $('.question-index').empty();
  $('#close-questions').hide();
  $('#question-status').text("Correct Answer Edited.");
};

const successCreateBoard = () => {
  $('h2').empty();
  $('.ans-cells').text("");
  $('.answers').show();
};

const successCreateQuestion = () => {
  $('#create-question-status').text("Question Created Successfully!");
  $("input[type=text]").val("");
};

const failureCreateQuestion = () => {
  $('#create-question-status').text("Failed! Please Fill in All Blanks");
  $("input[type=text]").val("");
};

module.exports = {
  indexSuccess,
  deleteSuccess,
  editSuccess,
  successCreateBoard,
  successCreateQuestion,
  failureCreateQuestion,
  showUserQuestionsSuccess,
};
