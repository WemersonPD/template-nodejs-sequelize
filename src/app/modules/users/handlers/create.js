const isEmpty = require('lodash/isEmpty');

const FUNCTIONS = require('../../../helpers/functions');

const db = require('../../../../database/models/');
const Users = db.Users;

const valideteFields = async (body) => {
  const errors = [];
  const keysRequiredInBody = [
    'email',
    'password',
    'taxDocumentNumber',
    'taxDocumentType',
    'phoneAreaCode',
    'phoneNumber',
    'birthDate',
    'fullname',
  ];

  for (const keyRequiredInBody of keysRequiredInBody) {
    const currentField = body[keyRequiredInBody];
    if (!currentField && currentField != 0) {
      errors.push({
        field: keyRequiredInBody,
        message: 'O campo é obrigatório',
      });
    }
  }

  const {
    email,
    phoneAreaCode,
    phoneNumber,
    birthDate,
    taxDocumentNumber,
    taxDocumentType,
  } = body;

  if (email) {
    const isValidEmail = FUNCTIONS.validateEmail(email);
    const emailAlreadyInUse = await validateIfEmailAlreadyInUse(
      email,
    );

    if (!isValidEmail) {
      errors.push({
        field: 'email',
        message: 'Informe um email válido',
      });
    } else if (emailAlreadyInUse) {
      errors.push({
        field: 'email',
        message: 'Email já em uso',
      });
    }
  }

  if (birthDate) {
    const isBiggerThen18 =
      FUNCTIONS.validateIfAgeBiggerThen18(birthDate);
    if (!isBiggerThen18) {
      errors.push({
        field: 'birthDate',
        message: 'O usuário deve ter mais de 18 anos',
      });
    }
  }

  if (taxDocumentNumber && taxDocumentType) {
    if (!['cpf', 'cnpj'].includes(taxDocumentType)) {
      errors.push({
        field: 'taxDocumentType',
        message: 'O tipo do documento deve ser cpf ou cnpj',
      });
    } else {
      const isValidDocument = FUNCTIONS.validateIfIsValidDocument(
        taxDocumentType,
        taxDocumentNumber,
      );

      if (!isValidDocument) {
        errors.push({
          field: 'taxDocumentNumber',
          message: `Informe um ${taxDocumentType.toUpperCase()} válido`,
        });
      }
    }
  }

  return errors;
};

const validateIfEmailAlreadyInUse = async (email) => {
  return await Users.findOne({
    where: {
      email,
    },
    attibutes: ['email'],
  });
};

const validateIfPhoneNumberAlreadyInUse = async (phoneNumberFull) => {
  return await Users.findOne({
    where: {
      phoneNumberFull,
    },
    attibutes: ['phoneNumberFull'],
  });
};

module.exports = async (req, res) => {
  const body = req.body;
  const isValidFields = await valideteFields(body);
  if (isValidFields.length) {
    return res
      .status(400)
      .json(
        FUNCTIONS.objectReturn(
          'Forneça dados válidos',
          isValidFields,
          true,
          400,
        ),
      );
  }
  return res.json('Foi');
};
