const jwt = require('jsonwebtoken')
const path = require('path');
module.exports = app => {
app.all('*/', (E) => console.log(E.headers.host))
app.post('/login', app.src.auth.login.login)
app.all('*/', app.src.auth.veryficarToken.verify)
app.get('/usuario', app.src.controller.usuario.listar)
app.get('/usuario/:id', app.src.controller.usuario.exibir)
app.post('/usuario', app.src.controller.usuario.salvar)
app.put('/usuario', app.src.controller.usuario.editar)
app.delete('/usuario/:id', app.src.controller.usuario.deletar)
app.get('/api/contrato', app.src.controller.contrato.listar)
app.post('/api/contrato', app.src.controller.contrato.salvar)
}
