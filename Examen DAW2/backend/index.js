const express = require('express')
const cors = require('cors')
const app = express()
const usuariosRouters = require('./routers/UsuarioRouter')

const port = 5000

app.use(express.json())
app.use(cors())


app.use(usuariosRouters)

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
})