const express = require('express')
const router = express.Router()
const usuarioController = require('../controllers/usuarioController')

router.get('/usuarios', usuarioController.getUsuarios)
router.post('/auth_usuario', usuarioController.validarUsuario)

module.exports = router