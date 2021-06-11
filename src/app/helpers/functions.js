const moment = require('moment');
const { cpf, cnpj } = require('cpf-cnpj-validator');
const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');
const crypto = require('crypto');
const isEmpty = require('lodash/isEmpty');
const jwt = require('jsonwebtoken');

const generateSalt = () => crypto.randomBytes(16).toString('hex');

const encryptIt = (password, salt) => {
  let hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  hash = hash.digest('hex');
  return hash;
};

const compareIt = (password, salt, hash) => {
  // Provided password, salt and hash to Database
  const currentPassword = encryptIt(password, salt);
  return currentPassword === hash;
};

// Token Validation
const tokenValidation = async (value) => {
  const split = value.split(' ');
  const token = split[1];

  const db = require('../../database/models');
  const Token = db.Tokens;
  let query = {
    where: {
      token,
    },
  };

  try {
    let data = await Token.findOne(query);

    if (!isEmpty(data)) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

const tokenDecode = (value) => {
  const split = value.split(' ');
  const token = split[1];

  const decoded = jwt.decode(token);
  return decoded;
};

const tokenExpired = (expiriedIn) => {
  const currentDate = new Date();
  const dateExpiration = new Date(expiriedIn);
  return currentDate > dateExpiration;
};

const validateFields = (keysRequired = [], body) => {
  const errors = [];

  for (const key of keysRequired) {
    if (
      body[key] === '' ||
      body[key] === undefined ||
      body[key] === null
    ) {
      errors.push({
        field: key,
        message: 'This field is required',
      });
    }
  }

  return errors;
};

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
  } else {
    const isValidEmail = emailValidator.validate(email);
    isValid = isValidEmail;
  }
  return isValid;
};

const getNumberRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const validatePassword = (password) => {
  const passwordValidatorSchema = new passwordValidator();
  passwordValidatorSchema
    .is()
    .min(8)
    .has()
    .uppercase()
    .has()
    .not()
    .spaces();
  // .is().not().oneOf(['Passw0rd', 'Password123']); //Future black list
  const errorsInPassword = passwordValidatorSchema.validate(
    password,
    {
      list: true,
    },
  );
  return errorsInPassword;
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

const validateAddress = (address) => {
  const errors = [];
  const keysRequired = [
    'zipCode',
    'city',
    'street',
    'streetNumber',
    'state',
    'country',
  ];

  for (const key of keysRequired) {
    if (!address[key]) {
      errors.push(key);
    }
  }

  return errors;
};

const functions = {
  objectReturn,
  validateEmail,
  getNumberRandomInt,
  validateIfAgeBiggerThen18,
  validateIfIsValidDocument,
  removeEspecialChars,
  validatePassword,
  validateAddress,
  generateSalt,
  encryptIt,
  compareIt,
};

module.exports = functions;
