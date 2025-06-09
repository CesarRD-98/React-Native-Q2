const sequelize = require('../config/db')
const { Gasto, Presupuesto, Categoria } = require('../models/asociaciones.model')
const response = require('../utils/response.util')

async function createGasto(req, res) {

    const t = await sequelize.transaction()

    try {
        const { nombre_gasto, codigo_categoria, monto, notas } = req.body
        const id_usuario = req.usuario.id

        const presupuesto = await Presupuesto.findOne({
            where: { id_usuario },
            attributes: ['id_presupuesto', 'monto'],
            transaction: t
        })

        if (isNaN(monto) || monto < 0) {
            await t.rollback()
            return response.error(res, 401, 'Monto inválido')
        }

        const montoValidado = parseFloat(
            parseFloat(monto).toFixed(2)
        )

        const nuevo_gasto = await Gasto.create({
            id_presupuesto: presupuesto.id_presupuesto,
            id_usuario,
            nombre_gasto,
            codigo_categoria,
            monto: montoValidado,
            notas: notas || ''

        }, { transaction: t })

        presupuesto.monto = parseFloat(
            (parseFloat(presupuesto.monto) - montoValidado).toFixed(2)
        )

        await presupuesto.save({ transaction: t })
        await t.commit()

        response.success(res, 'Gasto guardado correctamente', {
            id: nuevo_gasto.id_usuario,
            nombre_gasto: nuevo_gasto.nombre_gasto,
            categoria: nuevo_gasto.categoria,
            monto: nuevo_gasto.monto
        })

    } catch (error) {
        await t.rollback()
        response.error(res, 'Error en el servidor al crear gasto')
        console.log('Error inesperado en createGasto', error);
    }
}

async function historyGastos(req, res) {
    try {
        const id_usuario = req.usuario.id

        const gastos = await Gasto.findAll({
            where: { id_usuario },
            order: [['fecha_registro', 'DESC']],
            include: [
                {
                    model: Categoria,
                    as: 'categoria',
                    attributes: ['categoria'],
                }
            ]
        })

        if (gastos.length === 0) {
            return response.success(res, 'No hay gastos registrados', { gastos })
        }

        const gastosMap = gastos.map(g => ({
            id_gasto: g.id_gasto,
            nombre_gasto: g.nombre_gasto,
            categoria: g.categoria.categoria,
            monto: g.monto,
            fecha_registro: g.fecha_registro,
            notas: g.notas
        }))

        response.success(res, 'Historial de gastos', { gastos: gastosMap })

    } catch (error) {
        response.error(res, 'Error en el servidor al obtener gastos')
        console.log('Error inesperado en historyGasto', error);
    }
}

module.exports = {
    createGasto,
    historyGastos
}
