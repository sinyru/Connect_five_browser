'use strict';

const setAPIOrigin = require('../../lib/set-api-origin');
const config = require('./config');
const game = require('./gameEngine.js');
const auth = require('./auth/events.js');

$(() => {
  setAPIOrigin(location, config);
  game.addHandlers();
  auth.addHandlers();
});



require('./example');
