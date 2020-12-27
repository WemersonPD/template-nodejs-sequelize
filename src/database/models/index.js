const dbconfig = require('../config/database');

const Sequelize = require('sequelize');
const connection = new Sequelize(dbconfig);

const db = {};

db.Sequelize = Sequelize;
db.connection = connection;

db.essays = require('./essays.model')(connection, Sequelize);

module.exports = db;
