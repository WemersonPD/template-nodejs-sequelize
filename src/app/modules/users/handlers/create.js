const FUNCTIONS = require('../../../helpers/functions');

const db = require('../../../../database/models/');
const Users = db.Users;

const createAddress = require('../../addresses/handlers/create');

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
    'address',
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
    phoneCountryCode,
    birthDate,
    taxDocumentNumber,
    taxDocumentType,
    password,
    address,
  } = body;

  // Re-validete when enter with data, please
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

  // Re-validete when enter with data, please
  if (phoneAreaCode && phoneNumber) {
    const countryCode = phoneCountryCode || '55';
    const phoneNumberFull = FUNCTIONS.removeEspecialChars(
      `${countryCode}${phoneAreaCode}${phoneNumber}`,
      true,
    );
    const phoneNumberAlreadyInUse =
      await validateIfPhoneNumberAlreadyInUse(phoneNumberFull);
    if (phoneNumberAlreadyInUse) {
      errors.push({
        // field: 'phoneNumberFull',
        message: 'O número de telefone já está em uso',
      });
    }
  }

  if (password) {
    const errorsInPassword = FUNCTIONS.validatePassword(password);
    if (errorsInPassword.length) {
      for (const currentError of errorsInPassword) {
        let message;
        switch (currentError) {
          case 'min':
            message = 'A senha deve conter mais de 8 caracters';
            break;
          case 'uppercase':
            message =
              'A senha deve conter no mínimo uma letra maiúscula';
            break;
          case 'spaces':
            message = 'A senha não deve conter espaços';
            break;
          default:
            message = `Informe uma senha válida, erro de ${currentError}`;
            break;
        }
        errors.push({
          field: 'password',
          message,
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
    attributes: ['email'],
  });
};

const validateIfPhoneNumberAlreadyInUse = async (phoneNumberFull) => {
  return await Users.findOne({
    where: {
      phoneNumberFull,
    },
    attributes: ['phoneNumberFull'],
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

  const { address } = body;
  let addressId;
  try {
    addressId = await createAddress(address);
  } catch (error) {
    let dataReturn;
    switch (error.type) {
      case 'invalidFields':
        dataReturn = error.fields;
        break;
      default:
        dataReturn = {};
        break;
    }

    return res
      .status(400)
      .json(
        FUNCTIONS.objectReturn(error.message, dataReturn, true, 400),
      );
  }

  console.log(addressId);

  return res.json('Foi');
};
