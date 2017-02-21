'use strict';

let a = 1;

const changing = function() {
  a = 2;
};

module.exports = {
  changing,
  a
};
