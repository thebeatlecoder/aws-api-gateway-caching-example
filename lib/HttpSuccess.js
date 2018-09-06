'use strict';

class HttpSuccess {
  constructor(body, headers, statusCode) {
    this.body = body;
    this.statusCode = statusCode || 200;

    if (process.env.CORS_IS_ENABLED) {
      if (!headers) {
        headers = {};
      }
      headers['Access-Control-Allow-Origin'] = '*';
    }
    this.headers = headers;
  }

  get stringified() {
    return {
      body: JSON.stringify(this.body),
      headers: this.headers,
      statusCode: this.statusCode
    };
  }
}

module.exports = HttpSuccess;