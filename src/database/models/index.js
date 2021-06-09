const dbconfig = require('../config/database');

const Sequelize = require('sequelize');
const connection = new Sequelize(dbconfig);

const db = {};

db.Sequelize = Sequelize;
db.connection = connection;

db.Users = require('./users.model')(connection, Sequelize);
db.Addresses = require('./addresses.model')(connection, Sequelize);

module.exports = db;
