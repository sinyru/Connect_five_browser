'use strict';

const setAPIOrigin = require('../../lib/set-api-origin');
const config = require('./config');
const game = require('./gameEngine.js');

$(() => {
  setAPIOrigin(location, config);
  game.addHandlers();
});



require('./example');
