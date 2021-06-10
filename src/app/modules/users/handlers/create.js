const isEmpty = require('lodash/isEmpty');

const FUNCTIONS = require('../../../helpers/functions');
const db = require('../../../../database/models/');
const Test = db.test;

module.exports = async (req, resp) => {
  const body = req.body;

  try {
    const test = await Test.create(body);
    if (!isEmpty(test)) {
      return resp
        .status(200)
        .json(
          FUNCTIONS.objectReturn(
            'Testes criado com sucesso',
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
            'Informe dados válidos para o test',
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
