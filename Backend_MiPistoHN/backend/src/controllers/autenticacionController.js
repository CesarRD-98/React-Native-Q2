const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuarioModel')
const response = require('../utils/response')
const generateToken = require('../utils/generateToken')

async function authUsuario(req, res) {
    try {
        const { correo, contrasena } = req.body

        const usuario = await Usuario.findOne({ where: { correo_electronico: correo } })

        if (!usuario) {
            return response.error(res, 404, 'Usuario no registrado')
        }

        const comparePass = await bcrypt.compare(contrasena, usuario.contrasena)

        if (!comparePass) {
            return response.error(res, 400, 'Correo y/o contraseña incorrecta')
        }

        const token = generateToken({
            id: usuario.id_usuario,
            correo: usuario.correo_electronico,
            nombre: usuario.primer_nombre
        })

        response.success(res, 'Inicio de sesión exitoso', {
            token,
            usuario: {
                id: usuario.id_usuario,
                nombre: usuario.primer_nombre,
                apellido: usuario.primer_apellido,
                correo: usuario.correo_electronico,
                imagen: usuario.imagen_perfil
            }
        })

    } catch (error) {
        response.error(res, 'Error en el servidor')
        console.log('Error inesperado en authUsuario', error);
    }
}

module.exports = authUsuario