'use strict';

const DEBUG_LOGGING_IS_ENABLED = process.env.DEBUG_LOGGING_IS_ENABLED === 'true';
let output = console.log.bind(console);

module.exports.setOutput = outputFunction => {
  output = outputFunction;
}

module.exports.restoreOutput = () => {
  output = console.log.bind(console);
}

let createLogLineFrom = (logLevel, message, params) => {
  let json = Object.assign({}, { message }, params, global.CONTEXT);
  if (process.env.AWS_STAGE) {
    json.stage = process.env.AWS_STAGE;
  }
  if (process.env.AWS_REGION) {
    json.lambdaRegion = process.env.AWS_REGION;
  }

  return `${logLevel}: ${JSON.stringify(json)}`;
}

let writeToOutput = (logLevel, message, params) => {
  let logLine = createLogLineFrom(logLevel, message, params);
  output(logLine);
}

module.exports.debug = (msg, params) => {
  if (!DEBUG_LOGGING_IS_ENABLED) { return; }
  output(createLogLineFrom('DEBUG (7)', msg, params));
}
module.exports.info = (msg, params) => writeToOutput('INFO (6)', msg, params);
module.exports.notice = (msg, params) => writeToOutput('NOTICE (5)', msg, params);
module.exports.warn = (msg, params) => writeToOutput('WARN (4)', msg, params);
module.exports.error = (err, stack, params) => {
  let logLineParams = Object.assign({}, { stack }, params);
  writeToOutput('ERR (3)', err, logLineParams);
}
module.exports.critical = (msg, params) => writeToOutput('CRIT (2)', msg, params);
module.exports.alert = (msg, params) => writeToOutput('ALERT (1)', msg, params);
module.exports.emergency = (msg, params) => writeToOutput('EMERG (0)', msg, params);
