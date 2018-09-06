'use strict';

const APP_ROOT = '../../..'
const handleHttpRequest = require(`${APP_ROOT}/lib/handleHttpRequest`)
const listAllCats = require('./lib');

module.exports.handle = handleHttpRequest(listAllCats);
