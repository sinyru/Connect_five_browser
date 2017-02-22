'use strict';

const successSignIn = () => {
  $('#modal-sign-up').hide();
  $('#sign-in').hide();
  $('#change-password').show();
  $('#sign-out').show();
  $('.answers').show();
  $('#create-game').show();
  $('.gameboard').show();
};

const failureSignIn = () => {

};

const success = () => {

};

const failure = () => {

};

module.exports = {
  success,
  failure,
  successSignIn,
  failureSignIn,
};
