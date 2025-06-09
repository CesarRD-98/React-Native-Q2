const bcrypt = require('bcryptjs')
const fs = require('fs')
const path = require('path')
const { Usuario, Presupuesto, Gasto, Categoria } = require('../models/asociaciones.model')
const response = require('../utils/response.util')

async function getUsuario(req, res) { // testing
    try {
        const id_usuario = req.usuario.id

        const usuario = await Usuario.findByPk(id_usuario, {
            attributes: ['id_usuario', 'primer_nombre', 'primer_apellido', 'imagen_perfil']
        })

        if (!usuario) {
            return response.error(res, 404, 'Usuario no encontrado')
        }

        const presupuesto = await Presupuesto.findOne({
            where: { id_usuario },
            attributes: ['monto']
        })

        const gastos = await Gasto.findAll({
            where: { id_usuario },
            order: [['fecha_registro', 'DESC']],
            limit: 3,
            include: [
                {
                    model: Categoria,
                    as: 'categoria',
                    attributes: ['categoria']
                }
            ]
        })

        const gastosMap = gastos.map(g => ({
            id_gasto: g.id_gasto,
            nombre_gasto: g.nombre_gasto,
            categoria: g.categoria.categoria,
            monto: g.monto,
            fecha_registro: g.fecha_registro,
            notas: g.notas
        }))

        response.success(res, 'Éxito', {
            usuario,
            presupuesto,
            ultimos_gastos: gastos ? gastosMap : []
        })
    } catch (error) {
        response.error(res, 'Error en el servidor')
        console.log('Error inesperado en getUsuario', error);
    }
}

async function updateImagenUsuario(req, res) {
    try {
        const id_usuario = req.usuario.id
        const { filename } = req.file
        const imageDefault = '/uploads/default.png'

        const usuario = await Usuario.findByPk(id_usuario)

        if (!usuario) {
            return response.error(res, 404, 'Usuario no encontrado')
        }

        if (usuario.imagen_perfil && usuario.imagen_perfil !== imageDefault) { // si es verdadero, busca la ruta de la imagen existente
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
        response.error(res, 'Error en el servidor al cargar imagen')
        console.log('Error inesperado en updateImagenUsuario', error);
    }
}


async function updateNamesUsuario(req, res) {
    try {
        const { primer_nombre, primer_apellido } = req.body
        const id_usuario = req.usuario.id

        const usuario = await Usuario.findByPk(id_usuario)

        if (!usuario) {
            return response.error(res, 404, 'Usuario no encontrado')
        }

        usuario.primer_nombre = primer_nombre || usuario.primer_nombre
        usuario.primer_apellido = primer_apellido || usuario.primer_apellido

        await usuario.save()

        response.success(res, 'Nombre actualizado correctamente', {
            id: usuario.id_usuario,
            primer_nombre: usuario.primer_nombre,
            primer_apellido: usuario.primer_apellido
        })

    } catch (error) {
        response.error(res, 'Error en el servidor al actualizar nombre')
        console.log('Error inesperado en updateNamesUsuario', error);
    }
}

async function updatePasswordUsuario(req, res) {
    try {
        const id_usuario = req.usuario.id
        const { actual_contrasena, nueva_contrasena } = req.body

        const usuario = await Usuario.findByPk(id_usuario)

        if (!usuario) {
            return response.error(res, 404, 'Usuario no encontrado')
        }

        const comparePass = await bcrypt.compare(actual_contrasena, usuario.contrasena)

        if (!comparePass) {
            return response.error(res, 401, 'Las contraseñas no coinciden')
        }

        const contrasenaHash = await bcrypt.hash(nueva_contrasena, 10)

        usuario.contrasena = contrasenaHash
        await usuario.save()

        response.success(res, 'Contraseña actualizada correctamente', {
            id: usuario.id_usuario,
            correo: usuario.correo_electronico,
        })

    } catch (error) {
        response.error(res, 'Error en el servidor al actualizar contraseña')
        console.log('Error inesperado en updatePasswordUsuario', error);
    }
}

async function deleteUsuario(req, res) {
    try {
        const id_usuario = req.usuario.id

        const result = await Usuario.destroy({ where: { id_usuario } })

        if (result === 0) {
            return response.error(res, 404, 'No se encontró el usuario para eliminar')
        }

        response.success(res, 'Cuenta eliminada correctamente')

    } catch (error) {
        response.error(res, 'Error en el servidor al eliminar usuario')
        console.log('Error inesperado en deleteUsuario', error);
    }
}


module.exports = {
    getUsuario,
    updateImagenUsuario,
    updateNamesUsuario,
    updatePasswordUsuario,
    deleteUsuario
}