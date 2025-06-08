const express = require('express')
const authUsuario = require('../controllers/autenticacionController')
const router = express.Router()

router.post('/autenticacion', authUsuario)

module.exports = router