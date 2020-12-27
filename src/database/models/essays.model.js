module.exports = (connection, Sequelize) => {
  const Essays = connection.define(
    'redacao',
    {
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
    },
    {
      tableName: 'redacao',
      timestamps: false,
    },
  );

  return Essays;
};
