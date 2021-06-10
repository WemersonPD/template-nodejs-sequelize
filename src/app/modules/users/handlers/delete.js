const isEmpty = require('lodash/isEmpty');

const FUNCTIONS = require('../../../helpers/functions');
const db = require('../../../../database/models/');
const Test = db.test;

module.exports = async (req, resp) => {
  const id = req.params.id;

  const query = {
    where: {
      id,
    },
  };

  try {
    const result = await Test.destroy(query);
    if (!isEmpty(result)) {
      return resp
        .status(200)
        .json(
          FUNCTIONS.objectReturn(
            'Testes deletado com sucesso',
            null,
            false,
            200,
          ),
        );
    } else {
      return resp
        .status(400)
        .json(
          FUNCTIONS.objectReturn(
            'Informe um id válido',
            null,
            false,
            400,
          ),
        );
    }
  } catch (error) {
    console.log(error);
    return resp
      .status(500)
      .json({ message: error.message, route: '/test' });
  }
};
