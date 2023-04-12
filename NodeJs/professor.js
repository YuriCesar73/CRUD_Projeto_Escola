const Sequelize = require('sequelize');

const database = require('./db');

const Professor = database.define('professors', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    cpf: {
        type: Sequelize.STRING,
        allowNull: false
    },

    nascimento: {
        type: Sequelize.STRING,
        allowNull: false
    },

    sexo: {
        type: Sequelize.STRING,
        allowNull: false
    }

})

module.exports = Professor;