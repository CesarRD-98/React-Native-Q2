const { DataTypes } = require('sequelize')
const sequelize = require('../database/db')

const Usuario = sequelize.define('Usuario', {
    id_usuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo_usuario: {
        type: DataTypes.ENUM('admin', 'consultor'),
        defaultValue: 'admin'
    }
}, {
    tableName: 'Usuario',
    timestamps: false
})

module.exports = Usuario