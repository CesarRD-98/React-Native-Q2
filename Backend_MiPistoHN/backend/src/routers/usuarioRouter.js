const express = require('express')
const usuarioController = require('../controllers/usuarioController')
const upload = require('../middlewares/cargarImagenMiddleware')
const verifyToken = require('../middlewares/verificarTokenMiddleware')
const router = express.Router()

router.get('/usuario/:id', usuarioController.getUsuario)
router.post('/registro', usuarioController.registerUsuario)
router.put('/usuario/imagen', verifyToken, upload.single('image'), usuarioController.updateImagenUsuario)

module.exports = router