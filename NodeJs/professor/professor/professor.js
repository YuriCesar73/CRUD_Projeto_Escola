const Sequelize = require('sequelize');

const database = require('../BD/db');

const Professor = database.define('professores', {
    id: {
        type: Sequelize.INTEGER, 
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    matricula: {
        type: Sequelize.STRING,
        allowNull: true
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