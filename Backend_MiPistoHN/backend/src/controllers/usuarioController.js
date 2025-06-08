const bcrypt = require('bcryptjs')
const fs = require('fs')
const path = require('path')
const Usuario = require('../models/usuarioModel')
const response = require('../utils/response')

async function registerUsuario(req, res) {
    try {
        const {
            primer_nombre,
            primer_apellido,
            correo,
            contrasena
        } = req.body

        const usuarioExistente = await Usuario.findOne({ where: { correo_electronico: correo } })

        if (usuarioExistente) {
            return response.error(res, 404, 'El correo ya está registrado')
        }

        const contrasenaHash = await bcrypt.hash(contrasena, 10)

        const nuevoUsuario = await Usuario.create({
            primer_nombre,
            primer_apellido,
            correo_electronico: correo,
            contrasena: contrasenaHash
        })

        if (!nuevoUsuario) {
            return response.error(res, 'Error en el registro')
        }

        response.success(res, 'Registro exitoso', {
            id: nuevoUsuario.id_usuario,
            nombre: nuevoUsuario.primer_nombre,
            correo: nuevoUsuario.correo_electronico
        })
    } catch (error) {
        response.error(res, 500, 'Error en el servidor')
        console.log('Error inesperado en registerUsuario', error);
    }
}

async function getUsuario(req, res) {
    try {
        const id_usuario = req.params.id

        const usuario = await Usuario.findByPk(id_usuario)

        if (!usuario) {
            response.error(res, 404, 'El usuario no encontrado')
        }

        response.success(res, 'Éxito', usuario)
    } catch (error) {
        response.error(res, 500, 'Error en el servidor')
        console.log('Error inesperado en getUsuario', error);
    }
}

async function updateImagenUsuario(req, res) {
    try {
        const id_usuario = req.usuario.id
        const { filename } = req.file

        const usuario = await Usuario.findByPk(id_usuario)        
        
        if (!usuario) {
            response.error(res, 404, 'El usuario no encontrado')
        }

        if (usuario.imagen_perfil) { // si es verdadero, busca la ruta de la imagen existente
            const imagenAnteriorPath = path.join(__dirname, `../../${usuario.imagen_perfil}`) // se almacena la ruta
            if (fs.existsSync(imagenAnteriorPath)) { // si existe, borra la imagen anterior
                fs.unlinkSync(imagenAnteriorPath)
            }
        }

        const imagenPath = `/uploads/${filename}`

        usuario.imagen_perfil = imagenPath
        await usuario.save()
        
        response.success(res, 'Imagen actualizada correctamente', {
            imagen: imagenPath
        })

    } catch (error) {
        response.error(res, 500, 'Error en el servidor')
        console.log('Error inesperado en updateImagenUsuario', error);
    }
}


module.exports = {
    registerUsuario,
    getUsuario,
    updateImagenUsuario
}