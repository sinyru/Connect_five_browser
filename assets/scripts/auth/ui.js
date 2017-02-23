'use strict';

const successSignUp = () => {
  $('#modal-sign-up').hide();
  $('#sign-up-status').text("Sign-Up Successful!");
};

const failureSignUp = () => {
  $('#sign-up-status').text("Sign-Up Fail! Please try again!");
};

const successSignIn = () => {
  $('#modal-sign-up').hide();
  $('#sign-in').hide();
  $('#change-password').show();
  $('#sign-out').show();
  $('.answers').show();
  $('#create-game').show();
  $('.gameboard').show();
  $('#show-questions').hide();
  $('#create-question').hide();
  $('.question-index').empty();
  $('#sign-up-status').empty();
};

const failureSignIn = () => {
  $('#sign-in-status').text("Email and Password does not Match! Please try again");
};

const successSignOut = () => {
  $('#sign-in-status').empty();
  $('h2').empty();
  $('#change-password').hide();
  $('#sign-out').hide();
  $('.answers').hide();
  $('.gameboard').hide();
  $('#create-game').hide();
  $('#modal-sign-up').show();
  $('#sign-in').show();
  $('#show-questions').show();
  $('#create-question').show();
  $('#modal-sign-up').show();
  $('#change-password-status').text("Change Password!");
};

const successChangePassword = () => {
  $('#change-password-status').text("Change Password Successful!");
};

const failureChangePassword = () => {
  $('#change-password-status').text("Change Password Fail! Please try again!");
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
