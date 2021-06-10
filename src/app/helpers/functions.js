const moment = require('moment');
const { cpf, cnpj } = require('cpf-cnpj-validator');

// Default Object to Return in Response
const objectReturn = (message, data, error, statusCode) => ({
  message: message,
  data: data,
  error: !error ? false : true,
  statusText: !error ? 'OK' : 'NOK',
  statusCode: statusCode,
});

const validateEmail = (email = '') => {
  let isValid = true;
  if (!email || !email.includes('@') || email.includes(' ')) {
    isValid = false;
  }
  return isValid;
};

getNumberRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const validateIfAgeBiggerThen18 = (birthDate) => {
  const birthday = moment(birthDate, 'DD.MM.YYYY');
  const currentDate = moment(new Date(), 'DD.MM.YYYY');
  const age = currentDate.diff(birthday, 'years');

  return age >= 18;
};

const removeEspecialChars = (text = '', getOnlyNumbers = true) => {
  if (getOnlyNumbers) {
    return text.replace(/[^\d]/g, '');
  }
  return text.replace(/[^\w\d]/g, '');
};

const validateIfIsValidDocument = (
  // cpf or cnpj
  taxDocumentType = 'cpf',
  taxDocumentNumber = '',
) => {
  const taxDocumentNumberWithoutEspecialChars = removeEspecialChars(
    taxDocumentNumber,
    true,
  );
  let isValid = true;
  if (taxDocumentType === 'cpf') {
    isValid = cpf.isValid(taxDocumentNumberWithoutEspecialChars);
  } else if (taxDocumentType === 'cnpj') {
    isValid = cnpj.isValid(taxDocumentNumberWithoutEspecialChars);
  } else {
    isValid = false;
  }
  return isValid;
};

const functions = {
  objectReturn,
  validateEmail,
  getNumberRandomInt,
  validateIfAgeBiggerThen18,
  validateIfIsValidDocument,
  removeEspecialChars,
};

module.exports = functions;
