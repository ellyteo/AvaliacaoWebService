import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './swagger.js'
import cors from 'cors'

const app = express()

app.use(cors())

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use(express.json())

const livros = [
    {
        id: 1,
        nome: "Alice no país das maravilhas",
        autor: "Lewis Carroll"
    },
    {
        id: 2,
        nome: "A hipótese do amor",
        autor: "Ali Hazelwood"
    }
]

/**
 * @openapi
 * /livros:
 *   post:
 *     summary: Cria um livro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - autor
 *             properties:
 *               nome:
 *                 type: string
 *               autor:
 *                 type: string
 *     responses:
 *       201:
 *         description: Livro criado
 *       400:
 *         description: Dados inválidos
 */
app.post('/livros', (req, res) => {
    const nome = req?.body?.nome || null
    const autor = req?.body?.autor || null

    if (!nome) {
        res.status(400).json({ erro: 'Nome é obrigatório!' })
    }

    if (!autor) {
        res.status(400).json({ erro: 'Autor é obrigatório!' })
    }

    const novoLivro = { id: livros.length + 1, nome: nome, autor: autor }

    livros.push(novoLivro)
    res.status(201).json(novoLivro)
})


/**
 * @openapi
 * /livros/{id}:
 *   get:
 *     summary: Busca um livro pelo id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Livro encontrado
 *       404:
 *         description: Livro não encontrado
 */
app.get('/livros/:id', (req, res) => {
    const livro = livros.find(p => p.id === Number(req.params.id))

    if (!livro) {
        return res.status(404).json({ erro: 'Livro não encontrado!' })
    }

    res.status(200).json(livro)
})

/**
 * @openapi
 * /livros/{id}:
 *   put:
 *     summary: Atualiza um livro pelo id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               autor:
 *                 type: string
 *     responses:
 *       200:
 *         description: Livro atualizado
 *       404:
 *         description: Livro não encontrado
 */

app.get('/livros', (req, res) => {
    const { nome, autor } = req.query

    if (nome || autor) {
        const livrosFiltrados = livros.filter(item => item.nome.toLowerCase().includes(nome.toLowerCase()) || item.autor.toLowerCase().includes(autor.toLowerCase()))
        res.status(200).json(livrosFiltrados)
    } else {
        res.status(200).json(livros)
    }
})

app.put('/livros/:id', (req, res) => {
    const livro = livros.find(p => p.id === Number(req.params.id))

    if (!livro) {
        return res.status(404).json({ erro: 'Livro não encontrado!' })
    }

    if (req?.body?.nome && req.body.nome != "") {
        livro.nome = req.body.nome
    }

    if (req.body.autor && req.body.autor != "") {
        livro.autor = req.body.autor
    }

    res.status(200).json(livro)
})

/**
 * @openapi
 * /livros/{id}:
 *   delete:
 *     summary: Exclui um livro pelo id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Livros excluidos com sucesso
 *       404:
 *         description: Livros não encontrados
 */
app.delete('/livros/:id', (req, res) => {
    const indice = livros.findIndex(p => p.id === Number(req.params.id))

    if (indice === -1) {
        return res.status(404).json({ erro: 'Livro não encontrado' })
    }

    livros.splice(indice, 1)
    res.status(204).send()
})

app.get('/previsao', async (req, res) => {
    const { lat, lon } = req.query
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`


    try {
        const resposta = await fetch(url)
        const dados = await resposta.json
        res.status(200).json(dados.current_weather)
    } catch (error) {
        res.status(502).json({ erro: 'Falha ao consultar serviço de previsão do tempo' })
    }
})

app.get('/anime', async (req, res) => {
    const id = req.query?.id ?? ''
    const url = `https://api.jikan.moe/v4/anime/${id}`

    try {
        const resposta = await fetch(url)
        const dados = await resposta.json()
        const dados_para_retornar = {
            titulo: dados.data.title,
            duracao: dados.data.duration,
            resumo: dados.data.synopsis
        }
        res.status(200).json(dados_para_retornar)
    } catch (error) {
        res.status(502).json({ erro: 'Falha ao consultar serviço de anime' })
    }
})

export default app