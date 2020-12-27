const isEmpty = require('lodash/isEmpty');

const FUNCTIONS = require('../../../helpers/functions');
const db = require('../../../../database/models/');
const Essays = db.essays;

module.exports = async (req, resp) => {
  const query = {
    order: [['id', 'ASC']],
  };

  try {
    const data = await Essays.findAndCountAll(query);
    if (!isEmpty(data.count)) {
      return resp
        .status(200)
        .json(
          FUNCTIONS.objectReturn(
            'Redações encontradas',
            data,
            false,
            200,
          ),
        );
    } else {
      return resp
        .status(404)
        .json(
          FUNCTIONS.objectReturn(
            'Nenhuma redação encontrada',
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
      .json({ message: error.message, route: '/essay/all' });
  }
};
