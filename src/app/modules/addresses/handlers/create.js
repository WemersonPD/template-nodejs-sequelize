const {
  validateAddress,
  removeEspecialChars,
} = require('../../../helpers/functions');

const db = require('../../../../database/models/');
const Addresses = db.Addresses;

const valideteFields = async (address) => {
  const errors = [];

  if (address) {
    const errorsInAddress = validateAddress(address);
    for (const field of errorsInAddress) {
      errors.push({
        field: `address.${field}`,
        message: 'O campo é obrigatório',
      });
    }
  } else {
    errors.push({
      field: `address`,
      message: 'O campo é obrigatório',
    });
  }

  return errors;
};

// Include type of errors: "invalidFields", "errorInCreate"
module.exports = async (address) => {
  const errorsInAddress = await valideteFields(address);
  if (errorsInAddress.length) {
    throw {
      type: 'invalidFields',
      fields: errorsInAddress,
      message: 'Informe dados válidos',
    };
  }

  try {
    address.zipCode = removeEspecialChars(address.zipCode, true);
    const addressData = await Addresses.create(address);
    return addressData.dataValues.id;
  } catch (error) {
    throw {
      type: 'errorInCreate',
      message: `${error}`,
    };
  }
};
