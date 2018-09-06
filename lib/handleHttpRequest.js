'use strict';

const Promise = require('bluebird');
const log = require('./log');
const HttpSuccess = require('./HttpSuccess');
const HttpError = require('./HttpError');

const useLowerCaseKeysFor = headers => {
  let lowerCaseHeaders = {};

  Object.keys(headers).forEach(key => {
    lowerCaseHeaders[key.toLowerCase()] = headers[key];
  });
  return lowerCaseHeaders;
}

const succeedWith = (httpSuccess, callback) => {
  if (!(httpSuccess instanceof HttpSuccess)) {
    throw new Error('Expected HttpSuccess');
  }
  callback(null, httpSuccess.stringified);
}

const errorWith = (httpError, callback) => {
  if (!(httpError instanceof HttpError)) {
    throw new Error('Expected HttpError');
  }
  callback(null, httpError);
}

const handleHttpRequest = (handle, timeout = 5000) => {
  return (message, context, callback) => {
    log.debug('Request:', { message });
    message.headers = useLowerCaseKeysFor(message.headers);

    return Promise
      .try(() => handle(message))
      .timeout(timeout)
      .then(httpSuccess => succeedWith(httpSuccess, callback))
      .catch(Promise.TimeoutError, timeoutError => {
        log.error(timeoutError.message, timeoutError.stack);
        const httpError = new HttpError(504, `Task timed out after ${timeout} milliseconds`);

        errorWith(httpError, callback);
      })
      .catch(HttpError, httpError => {
        log.error(httpError.message);
        errorWith(httpError, callback);
      })
      .catch(err => {
        log.error(`Failed to process request:\n${err}`, err.stack);
        const httpError = new HttpError(500, 'Internal Server Error');
        errorWith(httpError, callback);
      });
  };
};

module.exports = handleHttpRequest;
