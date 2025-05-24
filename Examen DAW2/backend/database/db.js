const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('eventos_db', 'root', 'cesar' , {
    host: 'localhost',
    dialect: 'mysql'
})

if (sequelize) {
    console.log('Conexion exitosa con eventos_db');
}

module.exports = sequelize