const express = require('express')
const categoriaControlles = require('../controllers/categoriaController')
const verifyToken = require('../middlewares/verificarTokenMiddleware')
const router = express.Router()

router.get('/categorias', verifyToken, categoriaControlles.getCategorias)

module.exports = router