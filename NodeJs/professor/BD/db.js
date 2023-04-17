const Sequelize = require('sequelize');
const sequelize = new Sequelize('escola','gsort_node','12345678',{
    dialect: 'mysql',
    host: 'db4free.net',
    port: 3306
})

module.exports = sequelize;