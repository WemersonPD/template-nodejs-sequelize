'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'redacao',
      [
        {
          titulo: 'teste teste',
          tema: 'teste teste',
          redacao: 'teste teste',
          nota: [5, 5, 5, 5, 5, 25],
        },
      ],
      {},
    ),

  down: (queryInterface) =>
    queryInterface.bulkDelete('redacao', { titulo: 'test test' }, {}),
};
