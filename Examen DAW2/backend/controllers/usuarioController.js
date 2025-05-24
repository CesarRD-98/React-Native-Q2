const Usuario = require('../models/usuarioModel')

async function getUsuarios(req, res) {
    try {
        const usuarios = await Usuario.findAll()

        if (usuarios.length === 0) {
            res.json({ message: 'No se encontraron usuarios' })
        }


        res.status(200).json({
            nameTable: 'Usuario',
            success: true,
            data: usuarios
        })

    } catch (error) {
        res.status(500).json({ message: 'Ocurrio un error en el servidor' })
        console.error('Error en el controlador getUsuario >>', error);
    }
}

async function validarUsuario(req, res) {
    const { correo, contrasena } = req.body;

    try {
        const row = await Usuario.findOne({ where: { correo } })

        if (!row) {
            return res.status(404).json({
                message: 'No se encontro el usuario',
                success: false
            })
        }

        const usuario = row.get({ plain: true })

        if (usuario.contrasena !== contrasena) {
            return res.status(404).json({
                message: 'No coinciden las contraseñas',
                success: false
            })
        }

        res.status(200).json({
            message: 'Inicio de sesion exitoso',
            success: true,
            data: {
                correo: usuario.correo,
                tipo_usuario: usuario.tipo_usuario
            }
        })


    } catch (error) {
        res.status(500).json({ message: 'Ocurrio un error en el servidor', success: false })
        console.error('Error en el controlador validarUsuario >>', error);
    }
}

module.exports = {
    getUsuarios,
    validarUsuario
}