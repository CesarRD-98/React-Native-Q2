const express = require('express')
const usuarioController = require('../controllers/usuario.controller')
const upload = require('../middlewares/cargarImagen.middleware')
const verifyToken = require('../middlewares/verificarToken.middleware')
const router = express.Router()

router.get('/perfil', verifyToken, usuarioController.getUsuario) // testing
router.put('/perfil-imagen', verifyToken, upload.single('image'), usuarioController.updateImagenUsuario)
router.put('/perfil-nombre', verifyToken, usuarioController.updateNamesUsuario)
router.put('/perfil-contrasena', verifyToken, usuarioController.updatePasswordUsuario)

module.exports = router