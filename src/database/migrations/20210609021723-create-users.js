'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },

      taxDocumentNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      taxDocumentType: {
        type: Sequelize.ENUM('cpf', 'cnpj'),
        allowNull: false,
      },
      phoneCountryCode: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '55',
      },
      phoneAreaCode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        // unique: true,
      },
      phoneNumberFull: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      salt: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      birthDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      fullname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profileStatus: {
        type: Sequelize.ENUM(
          'active',
          'inactive',
          'waiting-validation',
        ),
        allowNull: false,
      },
      address: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Addresses',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      emailValidationStatus: {
        type: Sequelize.ENUM('waiting', 'approved'),
        allowNull: false,
      },
      phoneValidationStatus: {
        type: Sequelize.ENUM('waiting', 'approved'),
        allowNull: false,
      },
      accountType: {
        type: Sequelize.ENUM('user', 'admin'),
        allowNull: false,
        defaultValue: 'user',
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('Users');
  },
};
