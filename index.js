const express = require('express')
const app = express()
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

app.post('/livros/criar', (req, res) => {
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

app.get('/livros/buscar/:id', (req, res) => {
    const livro = livros.find(p => p.id === Number(req.params.id))

    if (!livro) {
        return res.status(404).json({ erro: 'Livro não encontrado!' })
    }

    res.status(200).json(livro)
})

app.get('/livros/filtrar', (req, res) => {
    const { nome, autor } = req.query

    if (nome || autor) {
        const livrosFiltrados = livros.filter(item => item.nome.includes(nome) || item.autor.includes(autor))
        res.status(200).json(livrosFiltrados)
    } else {
        res.status(200).json(livros)
    }
})

app.put('/livros/alterar/:id', (req, res) => {
    const livro = livros.find(p => p.id === Number(req.params.id))

    if (!livro) {
        return res.status(404).json({ erro: 'Livro não encontrado!' })
    }

    if (req?.body?.nome && req.body.nome != " ") {
        livro.nome = req.body.nome
    }

    if (req.body.autor) {
        livro.autor = req.body.autor
    }

    res.status(200).json(livro)
})

app.delete('/livros/deletar/:id', (req, res) => {
    const indice = livros.findIndex(p => p.id === Number(req.params.id))

    if (indice === -1) {
return res.status(404).json({ erro: 'Livro não encontrado' })
    }

    livros.splice(indice, 1)
    res.status(204).send()
})

app.listen(3000, () => console.log('Servidor rodando na porta 3000'))