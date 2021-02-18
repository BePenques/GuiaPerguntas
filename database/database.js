const Sequelize = require('sequelize');

const connection = new Sequelize('db-guiaperguntas', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;