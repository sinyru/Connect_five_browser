'use strict';

const successSignUp = () => {
  $('#modal-sign-up').hide();
  $('#sign-up-status').text("Sign-Up Successful!");
  $('#sign-in-status').empty();
};

const failureSignUp = () => {
  $('#sign-up-status').text("Sign-Up Fail! Please try again!");
  $('#sign-in-status').empty();
};

const successSignIn = () => {
  $('#modal-sign-up').hide();
  $('.sign-in-up').hide();
  $('.btn-change-password').show();
  $('#sign-out').show();
  $('#create-game').show();
  $('.gameboard').show();
  $('.btn-create-question').show();
  $('.question-index').empty();
  $('#sign-up-status').empty();
  $('#question-status').empty();
  $('#sign-up-status').empty();
  $('#show-questions').show();
  $('#create-question').show();
  $('#show-user-questions').show();
  $('#sign-in-status').empty();
};

const failureSignIn = () => {
  $('#sign-in-status').text("Email and Password does not Match! Please try again");
  $('#sign-up-status').empty();
};

const successSignOut = () => {
  $('#sign-in-status').empty();
  $('h2').empty();
  $('.btn-change-password').hide();
  $('#sign-out').hide();
  $('.answers').hide();
  $('.gameboard').hide();
  $('.cells').empty();
  $('#create-game').hide();
  $('#create-question').hide();
  $('#show-questions').hide();
  $('#close-questions').hide();
  $('#show-user-questions').hide();
  $('.btn-create-question').hide();
  $('#close-user-questions').hide();
  $('#modal-sign-up').show();
  $('.sign-in-up').show();
  $('#modal-sign-up').show();
  $('#change-password-status').text("Change Password!");
  $('#winner').empty();
  $('.question-index').empty();
  $('#question-status').empty();
};

const successChangePassword = () => {
  $('#change-password-status').text("Change Password Successfully!");
};

const failureChangePassword = () => {
  $('#change-password-status').text("Failed! Please try again!");
};

const success = () => {

};

const failure = () => {

};

module.exports = {
  success,
  failure,
  successSignUp,
  failureSignUp,
  successSignIn,
  failureSignIn,
  successSignOut,
  successChangePassword,
  failureChangePassword
};
