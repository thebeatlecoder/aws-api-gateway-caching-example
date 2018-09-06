'use strict';

const APP_ROOT = '../../..';
const retrieve = require(`${APP_ROOT}/data/retrieve`);
const HttpSuccess = require(`${APP_ROOT}/lib/HttpSuccess`);

const listAllCats = async (request) => {
  const locale = request.headers['accept-language'];
  
  const cats = retrieve.allCats(locale);

  return new HttpSuccess(cats);
};

module.exports = listAllCats;
