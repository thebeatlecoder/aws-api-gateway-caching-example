'use strict';

const APP_ROOT = '../../..'
const retrieve = require(`${APP_ROOT}/data/retrieve`);
const HttpSuccess = require(`${APP_ROOT}/lib/HttpSuccess`);
const HttpError = require(`${APP_ROOT}/lib/HttpError`);

const getCatByPawId = async (request) => {
  const { pawId } = request.pathParameters;
  const locale = request.headers['accept-language'];

  const cat = retrieve.aSingleCat(pawId, locale);
  if (!cat) {
    throw new HttpError(404, 'Cat not found');
  }
  return new HttpSuccess(cat);
};

module.exports = getCatByPawId;
