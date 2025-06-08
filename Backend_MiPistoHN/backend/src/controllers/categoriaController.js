const response = require('../utils/response')
const Categoria = require('../models/categoriaModel')

async function getCategorias(req, res) {
    try {
        const categorias = await Categoria.findAll()

        if (categorias.length === 0) {
            response.error(res, 404, 'No se encontraron resultados')
        }

        response.success(res, 'Éxito', categorias)
    } catch (error) {
        response.error(res, 'Error en el servidor')
        console.log('Error inesperado en getCategorias', error);
    }
}

module.exports = {
    getCategorias
}