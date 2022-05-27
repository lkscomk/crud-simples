var jwt = require('jsonwebtoken')
const validate = require('validate.js')
module.exports = app => {
    const validarUsuario = {
        email: {
            presence: true,
            email: true
        },
        senha: {
            presence: true,
            type: 'string'
        }
    }
    const login = async (req, res, next) => {
        try {
            const err = validate(req.body, validarUsuario)
            if (err) return res.json(err)

            const user = await app.db('usuario').where({email: req.body.email,senha: req.body.senha}).first()
            if (!user) return res.json({erro: "Usuário ou senha inválidos!"})

            const token = jwt.sign({data: {name: user.nome, email: user.email}

            }, process.env.APP_KEY, {expiresIn: '1h'});

            return res.json({token, payload: {name: user.nome, email: user.email}})
        } catch (error) {
            return res.json({erro: error.message})
        }
    }
return {login}
}
