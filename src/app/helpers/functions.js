const isEmpty = require('lodash/isEmpty');

// Default Object to Return in Response
const objectReturn = (message, data, error, statusCode) => ({
  message: message,
  data: data,
  error: !error ? false : true,
  statusText: !error ? 'OK' : 'NOK',
  statusCode: statusCode,
});

const functions = {
  objectReturn,
};

module.exports = functions;
