const express = require('express')
const path = require('path')
const categoriaRouter = require('./routers/categoriaRouter')
const usuarioRouter = require('./routers/usuarioRouter')
const autenticacionRouter = require('./routers/autenticacionRouter')
const app = express()

app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// rutas 
app.use(categoriaRouter) // => da acceso a rutas sobre categorias
app.use(usuarioRouter) // => da acceso a rutas sobre usuarios
app.use(autenticacionRouter) // => da acceso a la autenticacion de inicio de sesion del usuario

module.exports = app
