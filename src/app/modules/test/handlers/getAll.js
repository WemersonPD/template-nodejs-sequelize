const isEmpty = require('lodash/isEmpty');

const FUNCTIONS = require('../../../helpers/functions');
const db = require('../../../../database/models/');
const Test = db.test;

module.exports = async (req, resp) => {
  const query = {
    order: [['id', 'ASC']],
  };

  try {
    const { count, rows } = await Test.findAndCountAll(query);
    if (!isEmpty(rows)) {
      const bodyReturn = {
        count,
        rows,
      };
      return resp
        .status(200)
        .json(
          FUNCTIONS.objectReturn(
            'Testes encontrados',
            bodyReturn,
            false,
            200,
          ),
        );
    } else {
      return resp
        .status(404)
        .json(
          FUNCTIONS.objectReturn(
            'Nenhum test encontrado',
            null,
            false,
            404,
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
