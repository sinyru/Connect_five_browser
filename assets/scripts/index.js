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

$('#change-password').hide();
$('#sign-out').hide();
$('.answers').hide();
$('#create-game').hide();
$('.gameboard').hide();



require('./example');
