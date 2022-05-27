const validate = require('validate.js')

module.exports = (app) => {
    const validarUsuario = {
        nome: { presence: true },
        email: { presence: true, email: true },
        senha: { presence: true, type: 'number' }
    }
    const salvarUsuario = {
        id: { presence: true},
        nome: { presence: true },
        email: { presence: true, email: true },
        senha: { presence: true, type: 'number' }
    }

    const listar = async (req, res) => {
        try {
            const user = await app.db('usuario').select('id', 'nome', 'email')

            return res.json(user)
        } catch (error) {
            return res.json({ erro: error.message })
        }
    }
    const exibir = async (req, res) => {

        try {
            if (!Number(req.params.id)) throw new Error('Id não informado ou inválido')
            const user = await app.db('usuario').where({id: req.params.id}).select('id', 'nome', 'email').first()
            return res.json(user)
        } catch (error) {
            return res.json({ erro: error.message })
        }
    }

    const salvar = async (req, res) => {
        try {
            const err = await validate(req.body, validarUsuario)
            if (err) return res.json(err)
            const findOne = await app.db('usuario').where({email: req.body.email})
            if (findOne.length) {
                const idLocal = await app.db('usuario').select('id').where({email: req.body.email})

                await app.db('usuario').where({id: req.body.id}).update({
                    ativo: 1
                })
                return res.json({ menssagem: 'Usuário reativado com sucesso' })
            } else if (!findOne.length) {
                await app.db('usuario').insert({
                    nome: req.body.nome,
                    senha: req.body.senha,
                    email: req.body.email,
                    ativo: 1
                })
                return res.json({ menssagem: 'Usuário inserido com sucesso' })
            }
        } catch (error) {
            return res.json({ erro: error.message })
        }
    }

    const editar = async (req, res) => {
        try {
            const err = await validate(req.body, salvarUsuario)
            if (err) return res.json(err)

            const findOne = await app.db('usuario').where({id: req.body.id})
            if (!findOne.length) throw new Error('Usuário não encontrado')

            await app.db('usuario').where({id: req.body.id}).update({
                nome: req.body.nome,
                senha: req.body.senha,
                email: req.body.email
            })
            return res.json({message: 'Alterado'})

        } catch (error) {
            return res.json({ erro: error.message })
        }
    }

    const deletar = async (req, res) => {
        try {
            const findOne = await app.db('usuario').where({id: req.body.id, ativo: 1})
            if (!findOne.length) throw new Error('Usuário não encontrado')

            await app.db('usuario').where({id: req.body.id}).update({
                ativo: 0
            })
            return res.json({message: 'Excluído com sucesso'})

        } catch (error) {
            return res.json({ erro: error.message })
        }
    }

    return {
        listar,
        salvar,
        exibir,
        editar,
        deletar
    }
}
