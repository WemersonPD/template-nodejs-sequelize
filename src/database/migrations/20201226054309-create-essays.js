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
        allowNull: false,
      },
      redacao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nota: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL),
        allowNull: false,
      },
      create_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      update_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('redacao');
  },
};
