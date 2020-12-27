'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('redacao', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tema: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      redacao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nota: {
        type: Sequelize.ARRAY(Sequelize.REAL),
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('redacao');
  },
};
