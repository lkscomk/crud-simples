const validate = require('validate.js')
const knex = require("knex");

module.exports = (app) => {
    const validarUsuario = {
        nome: { presence: true },
        email: { presence: true, email: true },
        senha: { presence: true, type: 'number' }
    }
    const SalvarContrato = {
        tipo: { presence: true, type: 'number' },
        descricao: { presence: true},
        data_inicio: { presence: true},
        data_fim: { presence: true},
        data_assinatura: { presence: true}
    }

    const listar = async (req, res) => {
        try {
            const findOne = await app.db('contrato')
                                     .innerJoin('contrato_status as status', 'contrato.contrato_status_id', 'status.id')
                                     .innerJoin('contrato_tipo as tipo', 'contrato.contrato_tipo_id', 'tipo.id')
                                     .select('contrato.id',
                                             'tipo.descricao as tipoDescricao',
                                             'tipo.id as tipoCodigo',
                                             'status.descricao as statusDescricao',
                                             'tipo.id as statusCodigo',
                                             'status.cor as statusCor',
                                             'contrato.descricao',
                                             'contrato.data_inicio as dataInicio',
                                             'contrato.data_fim as dataFim')
            // const user = await app.raw('select * from contrato')

            return res.json(findOne)
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
            const contrato = await app.db('contrato').insert({
                contrato_tipo_id: req.body.tipo,
                descricao: req.body.descricao,
                data_inicio: req.body.data_inicio,
                data_fim: req.body.data_inicio,
                observacao: req.body.observacao,
                data_assinatura: req.body.data_assinatura,
            })
            return res.json({ id: contrato[0], menssagem: 'Contrato cadastrado com sucesso!' })
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
