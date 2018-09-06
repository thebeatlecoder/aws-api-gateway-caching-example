'use strict';

class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.body = JSON.stringify({ error: { message } });

    if (process.env.CORS_IS_ENABLED) {
      this.headers = { 'Access-Control-Allow-Origin': '*' };
    }
  }
}

module.exports = HttpError;
