'use strict';

const setAPIOrigin = require('../../lib/set-api-origin');
const config = require('./config');
const game = require('./gameEngine.js');
const auth = require('./auth/events.js');
const authQuestion = require('./authQuestions/event.js');

$(() => {
  setAPIOrigin(location, config);
  game.addHandlers();
  auth.addHandlers();
  authQuestion.addHandlers();
});

$('.btn-change-password').hide();
$('#sign-out').hide();
$('.answers').hide();
$('#create-game').hide();
$('.gameboard').hide();
$('#close-questions').hide();
$('#show-questions').hide();
$('.btn-create-question').hide();
$('#show-user-questions').hide();
$('#close-user-questions').hide();
$('#close-game').hide();

$('#close-game').on('click', ()=>{
  $('#show-user-questions').show();
  $('#close-user-questions').hide();
  $('#show-questions').show();
  $('.btn-change-password').show();
  $('.btn-create-question').show();
  $('#close-game').hide();
  $('.cells').off('click');
  $('.answers').hide();
  $('h2').show();
  $('h2').text('To Begin the Game, Please click New Game.');
  $('.cells').empty();
  $('#winner').empty();
});

$('#close-questions').on('click', ()=>{
  $('#show-questions').show();
  $('.question-index').empty();
  $('#close-questions').hide();
  $('#question-status').empty();
  $('#show-user-questions').show();
  $('#create-game').show();
  $('h2').text('To Begin the Game, Please click New Game.');
});

$('#close-user-questions').on('click', ()=>{
  $('#show-user-questions').show();
  $('.question-index').empty();
  $('#close-user-questions').hide();
  $('#question-status').empty();
  $('#show-questions').show();
  $('h2').text('To Begin the Game, Please click New Game.');
  $('#create-game').show();
});


$('.btn-create-question').on('click', ()=>{
  $('#create-question-status').text("Please Fill in All Blanks.");
});

$('.btn-change-password').on('click', ()=>{
  $('#change-password-status').text("Please Fill in All Blanks");
});

$('.btn-sign-in').on('click', ()=>{
  $('#sign-in-status').text("Please Fill in All Blanks.");
});

$('.btn-sign-up').on('click', ()=>{
  $('#sign-up-status').text("Please Fill in All Blanks");
});




require('./example');
