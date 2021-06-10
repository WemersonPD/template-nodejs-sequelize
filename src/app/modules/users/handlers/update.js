const isEmpty = require('lodash/isEmpty');

const FUNCTIONS = require('../../../helpers/functions');
const db = require('../../../../database/models/');
const Test = db.test;

module.exports = async (req, resp) => {
  const id = req.params.id;
  const body = req.body;

  const query = {
    where: {
      id,
    },
  };

  try {
    const test = await Test.update(body, query);
    if (!isEmpty(test)) {
      return resp
        .status(200)
        .json(
          FUNCTIONS.objectReturn(
            'Testes atualizado com sucesso',
            test,
            false,
            200,
          ),
        );
    } else {
      return resp
        .status(400)
        .json(
          FUNCTIONS.objectReturn(
            'Informe um id e dados válidos',
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
