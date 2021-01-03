module.exports = (connection, Sequelize) => {
  const Test = connection.define(
    'test',
    {
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'test',
      timestamps: false,
    },
  );

  return Test;
};
