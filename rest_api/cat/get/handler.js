'use strict';

const APP_ROOT = '../../..'
const getCatByPawId = require('./lib');
const handleHttpRequest = require(`${APP_ROOT}/lib/handleHttpRequest`);

module.exports.handle = handleHttpRequest(getCatByPawId);
